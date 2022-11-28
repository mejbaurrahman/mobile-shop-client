import React from 'react'
import { Link } from 'react-router-dom';
import errorImage from '../../images/errorImage.jpg';
export default function ErrorPage() {
  return (
    <div className='flex justify-center'>
        <div className='w-1/2 mx-auto'>
            <img src={errorImage} className='w-full' alt="" />
           <div className='flex justify-center'>
           <Link to='/'><button className='btn btn-primary mb-5 text-center'>Home</button></Link>
           </div>
        </div>
    </div>
  )
}
