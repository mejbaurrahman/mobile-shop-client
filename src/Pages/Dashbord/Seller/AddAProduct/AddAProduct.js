import { useQuery } from '@tanstack/react-query';
import id from 'date-fns/esm/locale/id/index.js';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { json, Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';

export default function AddAProduct() {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [categoryId, setCategoryId]= useState('');
    const {user} = useContext(AuthContext);
    const [addLoading, setAddLoading] = useState(false);
    const imageKey = process.env.REACT_APP_img_bb_key;
    const {data: categories=[], isLoading} = useQuery({
      queryKey:['categories'],
      queryFn: async ()=>{
        const res= await fetch(`https://mobileshop-inky.vercel.app/categories`)
        const data = await res.json();
        return data;
      }
    })
    const handleAddAProduct = data =>{
      setAddLoading(true);
      // console.log(data);
      const time = new Date().toLocaleString();

        const image = data.image[0];
        const formData = new FormData()
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_img_bb_key}`,{
          method:'POST',
          body:formData
        }).then(res=>res.json())
        .then(imageData=>{
          if(imageData?.success){
        
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
              sellerPhoto: user?.photoURL,
              sellerName:user?.displayName,
              postedTime:time
            };
            fetch(`https://mobileshop-inky.vercel.app/products`,{
              method: 'POST',
              headers:{
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(product)
            }).then(res=>res.json())
            .then(data=>{
              if(data.insertedId){
                setAddLoading(false)
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
        <h1 className='text-3xl text-primary uppercase text-left'>ADD A PRODUCT</h1>
        <div className="divider text-purple-700"></div> 
      </div>
      
      <div className='flex justify-center items-center my-16'>
      <div className='lg:w-2/3 w-full p-10 border border-1'>
        <h1 className='text-center text-xl mb-5 font-semibold'>Add A Product</h1>
        <div>
        {
          addLoading && <div className='flex justify-center items-center'>
          <div>
          <div role="status">
        <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
          </div>
        </div>
        }
      </div>
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
