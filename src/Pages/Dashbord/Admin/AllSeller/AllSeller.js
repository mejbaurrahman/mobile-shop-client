import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom'

export default function AllSeller() {
  const {data:sellers=[],refetch, isLoading} = useQuery({
    queryKey:['sellers'],
    queryFn: async ()=>{
      const res= await fetch(`http://localhost:5000/sellers`)
      const data = await res.json();
      return data;
    }
  })

  const handleVerfiyed =(id, email, name)=>{
    console.log('INIININI')
    fetch(`http://localhost:5000/sellers?email=${email}`,{
      method: 'PUT',
      headers: {
          'content-type':'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
      })
      .then(res => res.json())
      .then(data => {
          if (data.acknowledged) {
            console.log(data)
            
            fetch(`http://localhost:5000/sellers/${id}`,{
              method: 'PUT',
                headers: {
                'content-type':'application/json',
                  authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res=>res.json())
            .then(sellerData=>{
              if(sellerData.acknowledged){
                toast.success(`Seller ${name} is verifiyed now`)
                refetch();
                
              }
            })
              
          }
      })
  }
  const handleDelete=(id)=>{
    const confirm = window.confirm('Are you want to delete? ');
    if(confirm)
     {
      fetch(`http://localhost:5000/sellers/${id}`, {
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
      <h1 className='text-3xl text-primary uppercase text-left'>All Seller</h1>
      <div className="divider"></div> 
    </div>
    <div>
    <div className="overflow-x-auto">
<table className="table w-full">
  <thead>
    <tr>
      <th>Serial</th>
      <th>Seller Name</th>
      <th>Seller Email</th>
      <th>Verify</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
   {
    sellers&& sellers?.map((seller, i)=> <tr 
    key={seller._id}
    className="hover">
    <td>{i+1}</td>
    <td>{seller?.name}</td>
    <td>{seller?.email}</td>
    <td><button onClick={()=>handleVerfiyed(seller?._id, seller?.email, seller?.name)}  className='btn btn-primary' disabled={seller?.verify}>{seller?.verify?'Verified':'verify'}</button></td>
    <td><button onClick={()=>handleDelete(seller._id)}  className='btn btn-error'>Delete</button></td>
   
  </tr>)
   }
  
    
  </tbody>
</table>
</div>
    </div>
  </div>
  )
}
