import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../../../images/4.jpg';
import bannerImage2 from '../../../images/i6.jpg';
import bannerImage3 from '../../../images/i52.png';
import bannerImage4 from '../../../images/s13.jpg';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export default function Banner() {
  return (
    <div data-aos="fade-right">
        <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='max-w-sm'>
    {/* <img src={bannerImage} className="max-w-sm rounded-lg shadow-2xl" /> */}
    <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={bannerImage} className="w-full rounded-lg shadow-xl " />
   
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-3">
      <a href="#slide4" className="btn btn-square">❮</a> 
      <a href="#slide2" className="btn btn-square">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
  <img src={bannerImage2} className="w-full rounded-lg shadow-xl " />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-3">
      <a href="#slide1" className="btn btn-square">❮</a> 
      <a href="#slide3" className="btn btn-square">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
  <img src={bannerImage3} className="w-full rounded-lg shadow-xl " />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-3">
      <a href="#slide2" className="btn btn-square">❮</a> 
      <a href="#slide4" className="btn btn-square">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
  <img src={bannerImage4} className="w-full rounded-lg shadow-xl " />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-3">
      <a href="#slide3" className="btn btn-square">❮</a> 
      <a href="#slide1" className="btn btn-square">❯</a>
    </div>
  </div>
</div>
    </div>
    <div>
      <h1 className="text-5xl text-center font-bold">MShop</h1>
      <p className="py-6 text-center">MShop, Mobile Shop is the online page for resale used mobile. You can buy your favorite mobile costing less money.</p>
       <div className='flex justify-center' data-aos="fade-right">
       <Link to='/products'><button  className="btn btn-primary">Products <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></button></Link>
       </div>
    </div>
  </div>
</div>
    </div>
  )
}
