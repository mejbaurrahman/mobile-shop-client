import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom'

export default function AllBuyers() {
  const {data:buyers=[],refetch, isLoading} = useQuery({
    queryKey:['buyers'],
    queryFn: async ()=>{
      const res= await fetch(`http://localhost:5000/rolebuyers`)
      const data = await res.json();
      return data;
    }
  })

 
  const handleDelete=(id)=>{
    const confirm = window.confirm('Are you want to delete? ');
    if(confirm)
     {
      fetch(`http://localhost:5000/buyers/${id}`, {
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
      <h1 className='text-3xl text-primary uppercase text-left'>All buyers</h1>
      <div className="divider"></div> 
    </div>
    <div>
    <div className="overflow-x-auto">
<table className="table w-full">
  <thead>
    <tr>
      <th>Serial</th>
      <th>buyer Name</th>
      <th>buyer Email</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
   {
    buyers&& buyers?.map((buyer, i)=> <tr 
    key={buyer._id}
    className="hover">
    <td>{i+1}</td>
    <td>{buyer?.name}</td>
    <td>{buyer?.email}</td>
    
    <td><button onClick={()=>handleDelete(buyer._id)}  className='btn btn-error'>Delete</button></td>
   
  </tr>)
   }
  
    
  </tbody>
</table>
</div>
    </div>
  </div>
  )
}
