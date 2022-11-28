import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';
import BookNowModal from './BookNowModal/BookNowModal';
import ReportedToAdmin from './ReportedToAdmin/ReportedToAdmin';

export default function ProductDetail() {
    const loader = useLoaderData();
   const {user} = useContext(AuthContext)
   const navigate= useNavigate();
    const [seller, setSeller] = useState({})
    const {_id, productName, resalePrice, orginalPrice, description,sellerName,category, condition, image, postedTime, sellerEmail, usageYear} = loader;
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email)
    const describe = description?.split(',');
    const handleAddWishList = (id)=>{
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
      <button className="btn btn-primary lg:mx-3 mb-3" disabled={!isBuyer} onClick={()=>handleAddWishList(_id)}>Add Wish List</button>
      <label htmlFor="reportedtoadmin" className="btn btn-primary lg:mx-3 mb-3">Report To Admin</label>
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
