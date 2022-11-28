import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import useBuyer from '../../../Hooks/useBuyer';

export default function ReportedToAdmin({product}) {
  const [openModal, setOpenModal]= useState(true);
  const { register,formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
 
  const {user} = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email)
  // console.log(product)
  const handleReportNow =(e)=>{

  e.preventDefault();
  setOpenModal(true);
  const time = new Date().toLocaleString();
  const form = e.target;
 
  const mobile = form.mobile.value;
  const location = form.location.value;
  const report = form.report.value

  const reportDetail = {
    productName:product.productName,
    reporterName: user?.displayName,
    reporterEmail: user?.email,
    mobile,
    location,
    report,
    time,
    seller: product?.sellerEmail,
    image: product?.image,
    productId: product?._id
  }
 
  axios.post('http://localhost:5000/reportproducts', reportDetail)
  .then(function (response) {
    if(response?.data?.insertedId && isBuyer){
      
      toast.success(`Report for ${product.productName} is placed successfully`)
      navigate('/')
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
        <input type="checkbox" id="reportedtoadmin" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <div className='flex justify-center my-3'>
    <h1>Report for <span className='font-semibold text-primary'>{product.productName}</span></h1>
    <div className="divider"></div>
  </div>
    <div>
        <form onSubmit={handleReportNow} action="">
        
       
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
<div className="form-control w-full mb-3">
      <label className="label"> <span className="label-text">Report</span></label>
        <textarea type="text" 
        {...register("report")}
        placeholder="description" 
        className="input input-bordered w-full" />
       
    </div>


        <div>
        <button type="submit" className='btn btn-primary w-full'>Report</button>
        </div>
        </form>
    </div>
    <div className="modal-action">
      <label  htmlFor='reportedtoadmin' className="btn btn-error">close</label>
    </div>
  </div>
</div>
    </div>: user?.uid && !isBuyer?  <div>
        <input type="checkbox" id="reportedtoadmin" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Oppsss!!!</h3>
    <p className="py-4">You Have to be logged in as Buyer for Report </p>
    <div className="modal-action">
      <label  htmlFor="reportedtoadmin" className='btn btn-error'>Close</label>
    </div>
  </div>
</div>
</div>:<div>
        <input type="checkbox" id="reportedtoadmin" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Please Login as Buyer First</h3>
    <p className="py-4">You have to login as a buyer before report</p>
    <div className="modal-action">
     
      <Link to='/login'><label htmlFor="reportedtoadmin" className="btn">Ok</label></Link>
      <label  htmlFor="reportedtoadmin" className='btn btn-error'>Close</label>
    </div>
  </div>
</div>
</div> 
      }
    </div>
  )
}
