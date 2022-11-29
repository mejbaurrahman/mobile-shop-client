import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({booking}) {
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const {price} = booking;
    const navigate = useNavigate();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://mobileshop-inky.vercel.app/create-payment-intent", {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
            authorization:`bearer ${localStorage.getItem('accessToken')}`
            },
          body: JSON.stringify({ price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setSuccess('');
        setTransactionId('')
        setProcessing(true)
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (error) {
            console.log( error);
            setCardError(error.message)
          }else{
            setCardError('')
          }

          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: booking?.buyerName,
                  email:booking?.buyerEmail,
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError.message)
          }
          
         if(paymentIntent.status==='succeeded'){
            // toast.success('Successfully paid')
            setSuccess('Transaction Successfully Completed');
            setTransactionId(paymentIntent.id);

            //store data in the database
            const payment={
                productName: booking?.productName,
                buyerName: booking?.buyerName,
                buyerEmail: booking?.buyerEmail,
                productId: booking?.productId,
                bookingId: booking?._id,
                transactionId: paymentIntent.id,
                seller:booking?.seller
            }
            axios.post('https://mobileshop-inky.vercel.app/paymentcollections', payment)
            .then(function (response) {
                if(response?.data?.insertedId ){
                
                toast.success('Payment Placed Successfully')
                // navigate('/dashbord/myorders')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
         }
         setProcessing(false)
    }
  return (
 <>
    <form onSubmit={handleSubmit}>
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
    />
    <button className='btn btn-sm btn-primary mt-5' type="submit" disabled={!stripe || !clientSecret ||processing}>
      Pay
    </button>
  </form>
  <p className='text-red-600'>{cardError}</p>
  {
    success&&<div>
        <p className='text-green-600 '>{success}</p>
        <p className=''>Transaction Id: <span className='font-bold'>{transactionId}</span> </p>
    </div>
  }
 </>
  )
}
