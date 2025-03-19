import { updateticket } from "@/lib/actions"; 
export async function POST(request:any) {
    const body = await request.json();
    const { orderId, booking ,resultCode, message } = body;
  
    console.log('IPN received:', { orderId, resultCode, message });

    if (resultCode === 0) {
      await updateticket(orderId)
      console.log('Payment successful for order:', orderId);
      return new Response(JSON.stringify({ message: 'Payment confirmed' }), { status: 200 });
    } else {
      //này thì cũng giống z mà status khác
      console.log('Payment failed for order:', orderId);
    }
  
    return new Response(JSON.stringify({ message: 'IPN received' }), { status: 200 });
  }