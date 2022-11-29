import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import allu from '../../../images/allu.jpg';
import probash from '../../../images/probash.jpg';
import Suriya from '../../../images/Suriya.jpg';
import vijoy from '../../../images/vijoy.jpg';
export default function Testimonial() {
  return (
    <div className='py-6'>
        <div >
          <h1 className='text-5xl text-primary uppercase font-light'>Testimonial</h1>
          <div className="divider"></div>
      </div>
        <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full py-3">
    <div className='flex justify-center items-center'>
        <div className='w-1/2'>
            <p className='text-center'>"Mobile Shop- MShop is wonderfull online platform to buy resale mobile phone. I have already purchese 4 mobiles from them which was so good as its advertisement."</p>
            <div className='flex justify-center items-center mt-3'>
            <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={allu} />
            </div>
            </div>
            <div className='ml-3'>
                
                <div className='text-primary flex justify-start'><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar></div>
                <h1>Allu Arjun</h1>
            </div>
            </div>
        </div>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full py-3">
  <div className='flex justify-center items-center'>
        <div className='w-1/2'>
            <p className='text-center'>"Mobile Shop- MShop is wonderfull online platform to buy resale mobile phone. I have already purchese 4 mobiles from them which was so good as its advertisement."</p>
            <div className='flex justify-center items-center mt-3'>
            <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={probash} />
            </div>
            </div>
            <div className='ml-3'>
                
                <div className='text-primary flex justify-start'><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiOutlineStar></AiOutlineStar></div>
                <h1>Probash</h1>
            </div>
            </div>
        </div>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full py-3">
  <div className='flex justify-center items-center'>
        <div className='w-1/2'>
            <p className='text-center'>"Mobile Shop- MShop is not so much trustable but ok online platform to buy resale mobile phone. I have already purchese 4 mobiles from them which was so good as its advertisement."</p>
            <div className='flex justify-center items-center mt-3'>
            <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={Suriya} />
            </div>
            </div>
            <div className='ml-3'>
                
                <div className='text-primary flex justify-start'><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiOutlineStar></AiOutlineStar><AiOutlineStar></AiOutlineStar></div>
                <h1>Suriya</h1>
            </div>
            </div>
        </div>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full py-3">
  <div className='flex justify-center items-center'>
        <div className='w-1/2'>
            <p className='text-center'>"Mobile Shop- MShop is wonderfull online platform to buy resale mobile phone. I have already purchese 4 mobiles from them which was so good as its advertisement."</p>
            <div className='flex justify-center items-center pt-3'>
            <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={vijoy} />
            </div>
            </div>
            <div className='ml-3'>
                
                <div className='text-primary flex justify-start'><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiFillStar></AiFillStar><AiOutlineStar></AiOutlineStar></div>
                <h1>Vijoy</h1>
            </div>
            </div>
        </div>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
    </div>
  )
}
