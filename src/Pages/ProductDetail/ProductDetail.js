import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import BookNowModal from './BookNowModal/BookNowModal';

export default function ProductDetail() {
    const loader = useLoaderData();
    const [seller, setSeller] = useState({})
    const {_id, productName, resalePrice, orginalPrice, description, image, postedTime, sellerEmail, usageYear} = loader;

    const describe = description.split(',');
  return (
    <div>
        <div>
            <h1 className='text-5xl text-primary uppercase font-thin'>{productName}</h1>
            <div className="divider"></div>
        </div>
        <div>
        <div className="hero min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold my-5">{productName}</h1>
        <div className=''>
        <h1>Resale Price: {resalePrice}</h1>
        </div>
        <div>
        <h1>Orginal:{orginalPrice}</h1>
        </div>
      
        <div className=''>
        {/* <h1>Seller: {seller?.name}</h1> */}
        </div>
        <div>
        <h1>Posted:{postedTime}</h1>
        </div>
     
      {
        describe?.map(item =><p>{item}</p>)
      }
      <div className='lg:w-1/2 flex justify-start lg:flex-row flex-col mt-10'>
      <label htmlFor="booknowmodal" className="btn btn-primary lg:mx-3 mb-3">Book Now</label>
      <button className="btn btn-primary lg:mx-3 mb-3">Add Wish List</button>
      <button className="btn btn-primary lg:mx-3">Report</button>
      </div>
    </div>
  </div>
</div>
        </div>
      <BookNowModal></BookNowModal>
    </div>
  )
}
