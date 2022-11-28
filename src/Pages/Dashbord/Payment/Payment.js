import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CheckoutForm from './CheckOutForm/CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
export default function Payment() {
    const booking = useLoaderData();
  return (
    <div>
        <div>
            <h1 className='text-3xl font-thin'>Payment for <span className='text-primary'>{booking.productName}</span></h1>
            <div className="divider"></div>
        </div>
        <div>
            <h1 className=''>You have to pay {booking.price}tk or {parseInt(booking.price)/100}$ for this booking.</h1>
        </div>
        <div className='w-96 my-12'>
        <Elements stripe={stripePromise}>
      <CheckoutForm 
      booking={booking}
      />
    </Elements>
        </div>
    </div>
  )
}
