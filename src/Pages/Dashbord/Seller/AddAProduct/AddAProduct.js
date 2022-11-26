import { useQuery } from '@tanstack/react-query';
import id from 'date-fns/esm/locale/id/index.js';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { json, Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';

export default function AddAProduct() {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const imageKey = process.env.REACT_APP_img_bb_key;
    const {data: categories=[], isLoading} = useQuery({
      queryKey:['categories'],
      queryFn: async ()=>{
        const res= await fetch(`http://localhost:5000/categories`)
        const data = await res.json();
        return data;
      }
    })
    const handleAddAProduct = data =>{
      const time = new Date().toLocaleString();

        const image = data.image[0];
        const formData = new FormData()
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_img_bb_key}`,{
          method:'POST',
          body:formData
        }).then(res=>res.json())
        .then(imageData=>{
          if(imageData.success){
            const product = {
              productName: data.productName,
              image: imageData.data.url,
              condition: data.condition,
              mobile:data.mobile,
              location:data.location,
              category:data.category,
              description:data.description,
              resalePrice:data.resalePrice,
              orginalPrice:data.orginalPrice,
              usageYear:data.usageYear,
              sellerEmail: user?.email,
              postedTime:time
            };

            fetch(`http://localhost:5000/products`,{
              method: 'POST',
              headers:{
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(product)
            }).then(res=>res.json())
            .then(data=>{
              if(data.insertedId){
                toast.success(`${product.productName} added successfully`);
                navigate('/dashbord/myproducts')
              }
            })
          }
        })
    }

    if(isLoading){
      return <div className='flex justify-center mt-10'>
      <progress className="progress w-56"></progress>
     </div>
    }
  return (
    <div>
      <div>
        <h1 className='text-4xl mt-3 text-left uppercase font-semibold text-purple-600'>ADD A PRODUCT</h1>
        <div className="divider text-purple-700"></div> 
      </div>
      <div className='flex justify-center items-center my-16'>
      <div className='lg:w-2/3 w-full p-10 border border-1'>
        <h1 className='text-center text-xl mb-5 font-semibold'>Add A Product</h1>
      <form onSubmit={handleSubmit(handleAddAProduct)}>
      <div className="form-control w-full ">
      <label className="label"> <span className="label-text">Product Name</span></label>
        <input type="text" 
        {...register("productName", { required: "Product name is required" })}
        placeholder="Product Name" 
        className="input input-bordered w-full " />
       
    </div>
    {errors.productName?.type === 'required' && <p className='text-rose-800' role="alert">Product Name is required</p>} 
    <div className="form-control w-full">
      <label className="label"> <span className="label-text">Condition</span></label>
      <select {...register("condition", {required:'condition is required'})} 
        className='py-3 px-2 w-full border border-1 rounded'
      >
        <option disabled selected>Select Condition</option>
       <option value='excellent'>excellent</option>
       <option value='good'>good</option>
       <option value='fair'>fair</option>
      </select>
       
    </div>
    {errors.condition?.type === 'required' && <p className='text-rose-800' role="alert">condition is required</p>} 
    <div className="form-control w-full">
      <label className="label"> <span className="label-text">Mobile</span></label>
        <input type="text" 
        {...register("mobile", { required: "Mobile is required" })}
        placeholder="Mobile" 
        className="input input-bordered w-full" />
       
    </div>
    {errors.mobile?.type === 'required' && <p className='text-rose-800' role="alert">mobile is required</p>} 
      
    <div className="form-control w-full">
      <label className="label"> <span className="label-text">location</span></label>
        <input type="text" 
        {...register("location",{required:'location is required'})}
        placeholder="location" 
        className="input input-bordered w-full" />
       
    </div>
    {errors.location?.type === 'required' && <p className='text-rose-800' role="alert">location is required</p>} 
      <div className="form-control w-full mb-3">
      <label className="label"> <span className="label-text">Category</span></label>
      <select {...register("category",{ required: "Category is required" })} 
        className='py-3 px-2 w-full border border-1 rounded'
      >
        <option disabled selected>Select Category</option>
        {
          categories?.length>0 &&
          categories?.map((option,i)=><option key={option._id} value={option.category}>{option.category}</option>)
        }
      </select>
       
    </div>
    {errors.category?.type === 'required' && <p className='text-rose-800' role="alert">category is required</p>} 
    <div className="form-control w-full">
      <label className="label"> <span className="label-text">Description</span></label>
        <textarea type="text" 
        {...register("description", {required:'description is required'})}
        placeholder="description" 
        className="input input-bordered w-full" />
       
    </div>
    {errors.description?.type === 'required' && <p className='text-rose-800' role="alert">description is required</p>} 
    <div className="form-control w-full">
      <label className="label"> <span className="label-text">Resale Price</span></label>
        <input type="number" 
        {...register("resalePrice", {required:'Resale Price is Required'})}
        placeholder="Resale price" 
        className="input input-bordered w-full" />
       
    </div>
    {errors.resalePrice?.type === 'required' && <p className='text-rose-800' role="alert">Resale Price is required</p>} 
    <div className="form-control w-full">
      <label className="label"> <span className="label-text">Orginal Price</span></label>
        <input type="number" 
        {...register("orginalPrice", {required:'Orginal Price is required'})}
        placeholder="orginal price" 
        className="input input-bordered w-full" />
       
    </div>
    {errors.orginalPrice?.type === 'required' && <p className='text-rose-800' role="alert">Orginal Price is required</p>} 
    <div className="form-control w-full mb-3">
      <label className="label"> <span className="label-text">Years of Usage</span></label>
        <input type="text" 
        {...register("usageYear", {required:'Usage year is required'})}
        placeholder="Usage Year(Example: 2,3 ...)" 
        className="input input-bordered w-full" />
       
    </div>
    {errors.usageYear?.type === 'required' && <p className='text-rose-800' role="alert">usageYear is required</p>} 
      
    <div className="form-control w-full mb-3">
      <label className="label"> <span className="label-text">Image</span></label>
        <input type="file" 
        {...register("image", {required:'Image is required'})}
        placeholder="image" 
        className="input w-full" />
       
    </div>
    {errors.image?.type === 'required' && <p className='text-rose-800' role="alert">image is required</p>} 
      <input type="submit" value="Add A Product" className='btn btn-accent w-full' />
      </form>
      </div>
    </div>
    </div>
  )
}
