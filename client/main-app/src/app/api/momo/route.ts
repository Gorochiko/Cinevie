import { createTicket } from '../../../lib/actions';
import { FoodItem, Ticket, TypeTicket } from '../../../types';
import crypto from 'crypto';
import { auth } from "../../../lib/auth";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate environment variables
    if (!process.env.ACCESSKEY || !process.env.SECRETKEY) {
      return NextResponse.json(
        { error: "Missing Momo configuration" },
        { status: 500 }
      );
    }


    const getBaseUrl = () => {
      // Fallback cho từng môi trường
      return process.env.NEXT_PUBLIC_NODE_ENV === 'production'
        ? 'https://cinevie-two.vercel.app' // Dự phòng nếu biến env không tồn tại
        : 'http://localhost:3000';
    };
    const baseUrl = getBaseUrl();
    const Request = await request.json()
    const partnerCode = 'MOMO';
    const accessKey = process.env.ACCESSKEY;
    const secretKey = process.env.SECRETKEY as string;
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = 'Payment with Momo';
    const redirectUrl = `${baseUrl}/booking/${Request.showtime._id}`;
    const ipnUrl = `${baseUrl}/api/momo/ipn`;

    const amount = Request.totalPrice;
    const requestType = 'payWithMethod';
    const extraData = "";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');


    const ticketData: TypeTicket = {

      showtime: Request.showtime._id,
      user: Request.user.id,
      seats: Request.seats.map((seat: { row: string; number: number; }) => `${seat.row}${seat.number}`),
      combo: Request.combo.map((item: { food: FoodItem; quantity: number; }) => ({
        food: item.food,
        quantity: item.quantity
      })),
      totalPrice: Request.totalPrice,
      status: "pending",
    };



    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'en',
    };


    const momoResponse = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      // Add timeout configuration
      signal: AbortSignal.timeout(60000), // 60 second timeout
    });

    if (!momoResponse.ok) {
      throw new Error(`HTTP error! status: ${momoResponse.status}`);
    }

    const data = await momoResponse.json();

    if (data.resultCode === 0) {
      const dataTicket = await createTicket(ticketData) as Ticket;
      Request._id = dataTicket?._id;
    } else {
      throw new Error(data.message || 'Momo payment creation failed');
    }

    return NextResponse.json({
      bookingId: Request?._id,
      momoResponse: data,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating Momo payment:', error);
    return NextResponse.json({
      error: error.message || 'Failed to create payment'
    }, {
      status: error.status || 500
    });
  }
}