import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';
import BookNowModal from './BookNowModal/BookNowModal';
import ReportedToAdmin from './ReportedToAdmin/ReportedToAdmin';
import { GoVerified } from "react-icons/go";
import { useQuery } from '@tanstack/react-query';
export default function ProductDetail() {
    const loader = useLoaderData();
   const {user} = useContext(AuthContext)
   const navigate= useNavigate();
    const [seller, setSeller] = useState({})
    const {_id, productName, resalePrice, orginalPrice,sellerPhoto, description,sellerName,category, condition, image, postedTime, sellerEmail, usageYear} = loader;
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email)
    const describe = description?.split(',');
    const [verifyseller, setVerifyseller] = useState(null)
    const {data,refetch, isLoading} = useQuery({
      queryKey:['users'],
      queryFn: async ()=>{
        const res= await fetch(`http://localhost:5000/vseller?email=${sellerEmail}`)
        const data = await res.json();
        return data;
      }
    })
    const handleAddWishList = (id)=>{
      if(user?.email && isBuyer){
        const wishProductInfo = {
          productName,
          buyerName: user?.displayName,
          buyerEmail: user?.email,
          category,
          status: loader?.status,
          price: resalePrice,
          seller: sellerEmail,
          sellerName: sellerName,
          image: image,
          productId: _id,
          wishProduct: true
        }
        axios.post('http://localhost:5000/wishproducts', wishProductInfo)
    .then(function (response) {
      if(response?.data?.insertedId){
        
        toast.success('Wish Product added Successfully')
        navigate('/dashbord/')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
      }else{
        toast.error('Please Login as buyer to add wish list')
        
      }
     
    }

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
       
      
        <div className='my-3 flex justify-start'>
          
          <div className="avatar mr-2">
  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={sellerPhoto} />
  
</div>
          </div>
          <div>
              {
                data && data?.verify ? <div className='flex justify-start items-center'>
                <h1 className=''>{sellerName}</h1>
                <GoVerified className='text-primary mt-1'></GoVerified>
              </div> : <h1>{sellerName}</h1>
              }
        <div>
        <h1>Posted:{postedTime}</h1>
        </div>
          </div>
        </div>
        <div className=''>
        <h1>Resale Price: {resalePrice} Tk</h1>
        </div>
        <div>
        <h1>Orginal: {orginalPrice} Tk</h1>
        </div> 
     
      {
        describe?.map(item =><p>{item}</p>)
      }
      <div className='lg:w-1/2 flex justify-start lg:flex-row flex-col mt-10'>
      <label htmlFor="booknowmodal" className="btn btn-primary lg:mx-3 mb-3">Book Now <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></label>
      <button className={`btn btn-primary  lg:mx-3 mb-3 hover:Please login as buyer`} onClick={()=>handleAddWishList(_id)}>Add Wish List <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></button>
      <label htmlFor="reportedtoadmin" className="btn btn-primary lg:mx-3 mb-3">Report To Admin <BsFillArrowRightSquareFill className='ml-2'></BsFillArrowRightSquareFill></label>
      </div>
    </div>
  </div>
</div>
        </div>
      <BookNowModal
      product={loader}
      ></BookNowModal>

      <ReportedToAdmin
      product={loader}
      ></ReportedToAdmin>
    </div>
    
  )
}
