import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';


export default function Login() {
  const { register,formState: { errors }, handleSubmit } = useForm();
  const {user, login, loading, setLoading, googleLogin} = useContext(AuthContext);
  const [errorShow, setErrorShow] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [token] = useToken(loginEmail);
  let from = location.state?.from?.pathname || "/";

  if(token){
    navigate(from, {replace:true})
  }
  const handleLogin = data => {
    // console.log(data);
    setErrorShow('')
    login(data.email, data.password)
    .then(result=>{
      const user = result.user;
      // console.log(user)
      setLoginEmail(data.email);
      
    }).catch((error)=>{
      setErrorShow(error.message)
      setLoading(false)
    })


  }

  const handleGoogleLogin =()=>{
        setErrorShow('')
        googleLogin()
        .then(result=>{
          const user = result.user;
          
          saveUser(user?.displayName, user?.email)
          navigate(from, {replace:true})
        }).catch((error)=>{
          setErrorShow(error.message)
        })
  }
  const saveUser =(name, email)=>{
    setErrorShow('')
    const userInfo = {name, email, role:'buyer'};
    console.log(userInfo)
    fetch(`https://mobileshop-inky.vercel.app/googleusers`,{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res=>res.json())
    .then(data=>{
      setLoginEmail(email)
      toast.success('Logged in Successfully')
    }).catch(error=>{setErrorShow(error.message)
    setLoading(false)
    })
  }
  return (
   <>
   {
    loading ? <div className='flex justify-center items-center my-5'>
      <div>
      <div role="status">
    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
      </div>
    </div>: <div className='flex justify-center items-center my-16'>
    <div className='lg:w-1/3 w-full p-10 border border-1'>
      <h1 className='text-center text-xl mb-5 font-semibold'>Login</h1>
    <form onSubmit={handleSubmit(handleLogin)}>
    <div className="form-control w-full ">
    <label className="label"> <span className="label-text">Email</span></label>
      <input type="email" 
      {...register("email", { required: "Email is required" })}
      placeholder="Email" 
      className="input input-bordered w-full" />
     
  </div>
  {errors.email?.type === 'required' && <p className='text-rose-800' role="alert">Email is required</p>} 
    
    
    <div className="form-control w-full">
    <label className="label"> <span className="label-text">Password</span></label>
      <input type="password" 
      {...register("password", { required: "Password is required" })}
      placeholder="Password" 
      className="input input-bordered w-full" />
       {errors.password?.type === 'required' && <p className='text-rose-800' role="alert">Password is required</p>} <br />
     
  </div>
  <Link to='/' ><p className='mb-4'>Forget Password?</p></Link>
 
    
   
    <input type="submit" value="Login" className='btn btn-accent w-full' />
    </form>
    {
        errorShow && <p className='text-red-600'>{errorShow}</p>
      }
    <p>New to Mobile Shop <Link to='/signup' className='text-primary'>Create New Account</Link></p>
    <div className="divider">OR</div>
    <div className='flex justify-center'>
    <button className='btn btn-accent btn-outline' onClick={handleGoogleLogin} >Continue with Google</button>
    </div>
    </div>
  </div>
   }
    
   </>
  )
}
