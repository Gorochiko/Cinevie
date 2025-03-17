import { NextResponse } from "next/server"
export async function POST(request:any) {
    const body = await request.json();
    const { orderId, resultCode, message } = body;
  
    console.log('IPN received:', { orderId, resultCode, message });

    if (resultCode === 0) {
      //Sau này nếu pay ok thì gọi api cập nhật lại cái status của cái booking
      console.log('Payment successful for order:', orderId);
    } else {
      //này thì cũng giống z mà status khác
      console.log('Payment failed for order:', orderId);
    }
  
    return new Response(JSON.stringify({ message: 'IPN received' }), { status: 200 });
  }