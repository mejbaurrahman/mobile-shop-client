import React, { useEffect, useState } from 'react'
import AddvertiseProduct from './AddvertiseProduct/AddvertiseProduct';

export default function AdvertiseItems() {
    const [addvertisedProducts, setAddvertisedProducts] =useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    
    useEffect(()=>{
        setLoadingProducts(true)
        fetch(`http://localhost:5000/addvertisedproducts`)
        .then(res=>res.json())
        .then(data=>{
            setAddvertisedProducts(data);
        })
    }, [addvertisedProducts])
  
  return (
    <div className='my-6'>
        <div>
            <h1 className='text-5xl text-primary uppercase font-light'>Addvertised Products</h1>
            <div className="divider"></div>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-3'>
            {
                addvertisedProducts?.map((addvertisedProduct)=><AddvertiseProduct
                key={addvertisedProduct._id}
                addvertisedProduct={addvertisedProduct}
                >

                </AddvertiseProduct>)
            }

        </div>
    </div>
  )
}
