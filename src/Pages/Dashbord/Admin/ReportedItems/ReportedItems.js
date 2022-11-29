import { useQuery } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom'

export default function ReportedItems() {


  const {data: loader=[],refetch, isLoading} = useQuery({
    queryKey:['loader'],
    queryFn: async ()=>{
      const res= await fetch(`https://mobileshop-inky.vercel.app/reportproducts`)
      const data = await res.json();
      return data;
    }
  })
  const handleDelete=(id)=>{
    const confirm = window.confirm('Are you want to delete? ');
    if(confirm)
     {
      fetch(`https://mobileshop-inky.vercel.app/reportproducts/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type':'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Reported Item Successfully Deleted!')
                        refetch();
                    }
                })
     }

  }
  return (
    <div>
    <div>
      <h1 className='text-3xl text-primary uppercase text-left'>Reported Products</h1>
      <div className="divider"></div> 
    </div>
    <div>
    <div className="overflow-x-auto">
<table className="table w-full">
  <thead>
    <tr>
      <th>Serial</th>
      <th>Image</th>
      <th>Product</th>
      <th>report</th>
      <th>reporter</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
   {
    loader&& loader?.map((item, i)=> <tr 
    key={item._id}
    className="hover">
    <td>{i+1}</td>
    <td><img src={item?.image} alt="" className='w-3/4 rounded'/></td>
    <td>{item?.productName}</td>
    <td>{item?.report}</td>
    <td>{item?.reporterName}</td>
    <td><button onClick={()=>handleDelete(item._id)}  className='btn btn-error'>Delete</button></td>
  </tr>)
   }
  
    
  </tbody>
</table>
</div>
    </div>
  </div>
  )
}
