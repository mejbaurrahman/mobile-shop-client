import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import AddvertiseProduct from '../Home/AdvertiseItems/AddvertiseProduct/AddvertiseProduct';


export default function Products() {
    const [addvertisedProducts, setAddvertisedProducts] =useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const {data:users=[],refetch, isLoading} = useQuery({
    queryKey:['users'],
    queryFn: async ()=>{
      const res= await fetch(`http://localhost:5000/verifyuser`)
      const data = await res.json();
      return data;
    }
  })

    useEffect(()=>{
        setLoadingProducts(true)
        fetch(`http://localhost:5000/allproducts`,{
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setAddvertisedProducts(data);
        })
    }, [addvertisedProducts])
  
  return (
    <div className='my-6'>
        <div>
            <h1 className='text-5xl text-primary uppercase font-light'>All Products</h1>
            <div className="divider"></div>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-3'>
            {
                addvertisedProducts?.map((addvertisedProduct)=><AddvertiseProduct
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
