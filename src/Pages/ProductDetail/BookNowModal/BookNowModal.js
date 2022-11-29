import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import useBuyer from '../../../Hooks/useBuyer';

export default function BookNowModal({product}) {
  const [openModal, setOpenModal]= useState(true);
  const { register,formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
 
  const {user} = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email)
  // console.log(product)
  const handleBookNow =(e)=>{

  e.preventDefault();
  setOpenModal(true);
  const form = e.target;
  const productName = form.productName.value;
  const buyerName = form.buyerName.value;
  const price = form.price.value;
  const buyerEmail = form.buyerEmail.value;
  const mobile = form.mobile.value;
  const location = form.location.value;
  const category = form.category.value;

  const bookingInfo = {
    productName,
    buyerName,
    buyerEmail,
    mobile,
    location,
    category,
    price,
    seller: product?.sellerEmail,
    image: product?.image,
    productId: product?._id
  }
  console.log(bookingInfo)
  axios.post('https://mobileshop-inky.vercel.app/orders', bookingInfo)
  .then(function (response) {
    if(response?.data?.insertedId && isBuyer){
      
      toast.success('Order Placed Successfully')
      navigate('/dashbord/myorders')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  return (
    <div>
      {
        user?.uid && isBuyer ? <div>
        <input type="checkbox" id="booknowmodal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <div className='flex justify-center my-3'>
    <h1>Booking for <span className='font-semibold text-primary'>{product.productName}</span></h1>
    <div className="divider"></div>
  </div>
    <div>
        <form onSubmit={handleBookNow} action="">
        <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Product</span>
  </label>
  <input type="text" placeholder="Type here" name='productName' defaultValue={product.productName} disabled={product?.productName} className="input input-bordered w-full" />
 
</div>
        <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Buyer Name</span>
  </label>
  <input type="text" placeholder="Type here" name='buyerName' defaultValue={user?.displayName} disabled={user?.displayName} className="input input-bordered w-full" />
 
</div>
        <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Buyer Email</span>
  </label>
  <input type="email" placeholder="Type here" name='buyerEmail' defaultValue={user?.email} disabled={user?.email} className="input input-bordered w-full" />
 
</div>
        <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Price</span>
  </label>
  <input type="number" placeholder="Type here" name='price' defaultValue={product?.resalePrice} disabled={product?.resalePrice} className="input input-bordered w-full" />
 
</div>
        <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Category</span>
  </label>
  <input type="text" placeholder="Type here" name='category' defaultValue={product.category} disabled={product?.category} className="input input-bordered w-full" />
 
</div>
        <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Mobile</span>
  </label>
  <input type="text" placeholder="Type here" name='mobile' className="input input-bordered w-full" />
 
</div>
        <div className="form-control w-full mb-3">
  <label className="label">
    <span className="label-text">location</span>
  </label>
  <input type="text" placeholder="Type here" name='location'  className="input input-bordered w-full" />
 
</div>

        <div>
        <button type="submit" className='btn btn-primary w-full'>Order</button>
        </div>
        </form>
    </div>
    <div className="modal-action">
      <label  htmlFor='booknowmodal' className="btn btn-error">close</label>
    </div>
  </div>
</div>
    </div>: user?.uid && !isBuyer?  <div>
        <input type="checkbox" id="booknowmodal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Oppsss!!!</h3>
    <p className="py-4">You Have to be logged in as Buyer for Booking </p>
    <div className="modal-action">
      <label  htmlFor="booknowmodal" className='btn btn-error'>Close</label>
    </div>
  </div>
</div>
</div>:<div>
        <input type="checkbox" id="booknowmodal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Please Login as Buyer First</h3>
    <p className="py-4">You have to login as a buyer before booking</p>
    <div className="modal-action">
     
      <Link to='/login'><label htmlFor="booknowmodal" className="btn">Ok</label></Link>
      <label  htmlFor="booknowmodal" className='btn btn-error'>Close</label>
    </div>
  </div>
</div>
</div> 
      }
    </div>
  )
}
