import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BookNowModal from '../../../ProductDetail/BookNowModal/BookNowModal';
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { useQuery } from '@tanstack/react-query';
export default function AddvertiseProduct({addvertisedProduct, users}) {
//   const [categoryId, setCategoryId] = useState('');
  const [verifyseller, setVerifyseller] = useState(null)
  const {productName, image, resalePrice, orginalPrice,sellerName, sellerEmail, category,condition, location, _id } = addvertisedProduct;

  useEffect(()=>{
    const s = users.find(user=>user.email === sellerEmail)
    setVerifyseller(s);
  }, [verifyseller])
  return (

    <div className='' data-aos="fade-down">
        <div className="card w-full glass p-4">
  <figure><img src={image} className='w-1/2'/></figure>
  <div className="card-body">
    <h2 className="card-title text-center">{productName}</h2>
    <div>
    <h1 className=''>Condition: {condition}</h1>
      {
        verifyseller && verifyseller?.verify ? <div className='flex justify-start items-center'>
          <h1 className='text-center'>Seller: {sellerName}</h1>
          <GoVerified className='text-primary mt-1'></GoVerified>
        </div>:<div>
          <h1 className=''>Seller: {sellerName}</h1>
        </div>
      }
        <h1 className=''>Price: {resalePrice}Tk</h1>
        <h1 className=''>Orginal Price: {orginalPrice}Tk</h1>
    </div>
    <div className="card-actions flex justify-center">
   
    <label htmlFor="booknowmodal" className="btn btn-primary lg:mx-3 mb-3">Book Now <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></label>
      <Link to={`/product/${addvertisedProduct._id}`}><button className="btn btn-primary">Details <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></button></Link>
    </div>
  </div>
</div>
    
      <BookNowModal
      product= {addvertisedProduct}
      
      >

      </BookNowModal>
    </div>
 
  )
}
