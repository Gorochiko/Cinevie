import crypto from 'crypto';
import { NextResponse } from "next/server"
export async function POST(request:Request) {
  const Request = await request.json()
  const partnerCode = 'MOMO';
  const accessKey = process.env.ACCESSKEY;
  const secretKey ='K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const requestId = partnerCode + new Date().getTime();
  const orderId = requestId;
  const orderInfo = 'Payment with Momo';
  const redirectUrl = 'http://localhost:3000/payment-success'; 
  const ipnUrl = 'http://localhost:3000/api/momo/ipn'; 
  const amount = Request.totalPrice; 
  const requestType = 'payWithMethod';
  const extraData = ''; 

 
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  
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

  try {
    const momoResponse = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const data = await momoResponse.json();
    return new Response(JSON.stringify(data), { status: 200 }); 
  } catch (error) {
    console.error('Error creating Momo payment:', error);
    return new Response(JSON.stringify({ error: 'Failed to create payment' }), { status: 500 });
  }
}