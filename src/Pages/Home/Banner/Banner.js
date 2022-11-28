import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../../../images/4.jpg';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export default function Banner() {
  return (
    <div data-aos="fade-right">
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={bannerImage} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl text-center font-bold">MShop</h1>
      <p className="py-6 text-center">MShop, Mobile Shop is the online page for resale used mobile. You can buy your favorite mobile costing less money.</p>
       <div className='flex justify-center'>
       <Link to='/products'><button className="btn btn-primary">Products <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></button></Link>
       </div>
    </div>
  </div>
</div>
    </div>
  )
}
