import { useQuery } from '@tanstack/react-query';
import id from 'date-fns/esm/locale/id/index.js';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { json, Link, useNavigate } from 'react-router-dom'; 

export default function CategoryAdd() {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
   
   
    const handleAddACategory = data =>{
            
            const category = {
              category: data.name,
            }

            fetch(`http://localhost:5000/categories`,{
              method: 'POST',
              headers:{
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(category)
            }).then(res=>res.json())
            .then(data=>{
              if(data.insertedId){
                toast.success(`${category.category} added successfully`);
                navigate('/dashbord')
              }
            })
          
       
    }
  return (
    <div className='flex justify-center items-center my-16'>
      <div className='lg:w-2/3 w-full p-10 border border-1'>
        <h1 className='text-center text-xl mb-5 font-semibold'>Add A Category</h1>
      <form onSubmit={handleSubmit(handleAddACategory)}>
      <div className="form-control w-full mb-3">
      <label className="label"> <span className="label-text">Name</span></label>
        <input type="text" 
        {...register("name", { required: "Name is required" })}
        placeholder="name" 
        className="input input-bordered w-full " />
       
    </div>
    {errors.name?.type === 'required' && <p className='text-rose-800' role="alert"> Category Name is required</p>} 
    
      <input type="submit" value="Add Category" className='btn btn-accent w-full' />
      </form>
      </div>
    </div>
  )
}
