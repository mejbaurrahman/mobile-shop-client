import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import AddvertiseProduct from '../Home/AdvertiseItems/AddvertiseProduct/AddvertiseProduct';

export default function ProductsByCategory() {
    const loader= useLoaderData();
    const {data:users=[],refetch, isLoading} = useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
          const res= await fetch(`http://localhost:5000/verifyuser`)
          const data = await res.json();
          return data;
        }
      })
  return (
    <div className='my-6'>
        <div>
            <h1 className='text-5xl text-primary uppercase font-light'>{loader?.categoryName}</h1>
            <div className="divider"></div>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-3'>
            {
                loader?.result?.map((addvertisedProduct)=><AddvertiseProduct
                key={addvertisedProduct._id}
                addvertisedProduct={addvertisedProduct}
                users = {users}
                >

                </AddvertiseProduct>)
            }

        </div>
    </div>
  )
}
