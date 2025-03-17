"use client"
import { useState } from 'react';

export default function Home() {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/momo', {
        method: 'POST',
      });
      console.log(response)
      const data = await response.json();
      if (data.payUrl) {
        console.log("đâsdasdasdadasd",data)
        setPaymentUrl(data.payUrl);
      } else {
        console.error('Failed to get payment URL:', data);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <div className='h-full w-full'>
      <h1>Momo Payment Integration</h1>
      <button onClick={handlePayment}>Pay with Momo</button>
      {paymentUrl && (
        <p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            Go to Momo
          </a>
        </p>
      )}
    </div>
  );
}