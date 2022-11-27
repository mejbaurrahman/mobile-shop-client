import React from 'react'
import { useLoaderData } from 'react-router-dom'
import AddvertiseProduct from '../Home/AdvertiseItems/AddvertiseProduct/AddvertiseProduct';

export default function ProductsByCategory() {
    const loader= useLoaderData();
    console.log(loader)
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
                >

                </AddvertiseProduct>)
            }

        </div>
    </div>
  )
}
