import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function Navigation() {
  const navigate = useNavigate();
  const {user,loading, logOut} = useContext(AuthContext);

  const handleLogOut=()=>{
    return logOut().then(res=>{
      navigate('/login')
    }).catch()
  }
  return (
    <div>
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        {
          !loading && user?.uid ? <>
          {/* <li>{user?.displayName}</li> */}
          <li><Link to='/dashbord'>Dashbord</Link></li>
          <button className='btn btn-ghost' onClick={handleLogOut}>Logout</button>
          </>: <li><Link to='/login'>Login</Link></li>
        }
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl"><span className='text-2xl font-bold text-primary'>M</span>Shop</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal p-0">
    <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        {
          !loading && user?.uid ? <>
          {/* <li>{user?.displayName}</li> */}
          <li><Link to='/dashbord'>Dashbord</Link></li>
          <button className='btn btn-ghost' onClick={logOut}>Logout</button>
          </>: <li><Link to='/login'>Login</Link></li>
        }
    </ul>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            !loading && user?.uid && <img src={user?.photoURL}/>
          }
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          {
            !loading && user?.uid && <a className="justify-between">
            {user?.displayName}
            
          </a>
          }
        </li>
      </ul>
    </div>
    {
    window.location.pathname === '/dashbord' && <label htmlFor="dashbord-drawer" tabIndex={0} className="btn btn-ghost lg:hidden ml-auto">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
</label>
  }
  </div>
</div>
    </div>
  )
}
