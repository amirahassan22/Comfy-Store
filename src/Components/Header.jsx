import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../Features/User/userSlice'
import { clearCart } from '../Features/Cart/CartSlice'
import { useQueryClient } from '@tanstack/react-query'

export default function Header() {
  const {user} = useSelector(state=> state.user)
  const navigate = useNavigate();
  console.log(user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handleLogout = ()=>{
    navigate('/');
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  }
  return (
    <header className='bg-blue-950 text-center md:text-end px-10 py-2'>
      {user ? <div className='flex justify-end'>
        <p className='me-5 text-base-100'>Hello , {user.username}</p>
        <button  className="btn btn-outline btn-info btn-xs" onClick={handleLogout}>Logout</button>
      </div> : <div>
            <Link to="Login" className='text-white me-5 text-sm font-normal hover:text-white hover:link'>Sign in / Guest</Link>
            <Link to="register" className='text-white me-5 text-sm font-normal hover:text-white hover:link'>Create Account</Link>
        </div>}
        
    </header>
  )
}
