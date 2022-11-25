import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useSeller from '../../Hooks/useSeller';



export default function SellerRoute({children}) {

    const {user, loading} = useContext(AuthContext);
    const location= useLocation();
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    if(loading || isSellerLoading){
        return <div className='flex justify-center mt-10'>
         <progress className="progress w-56"></progress>
        </div>
     }
    if(user&&isSeller){
        return children;
    }
   
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}