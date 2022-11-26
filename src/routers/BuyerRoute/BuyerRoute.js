import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

import useBuyer from '../../Hooks/useBuyer';


export default function BuyerRoute({children}) {

    const {user, loading} = useContext(AuthContext);
    const location= useLocation();
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    if(loading || isBuyerLoading){
        return <div className='flex justify-center mt-10'>
         <progress className="progress w-56"></progress>
        </div>
     }
    if(user&&isBuyer){
        return children;
    }
   
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}