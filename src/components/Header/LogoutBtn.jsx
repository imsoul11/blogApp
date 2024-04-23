import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import {logout} from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler=()=>{
         authService.logout().then(()=>{
            dispatch(logout())
         })
    }
  return (
    <button
    className='inline-bock px-4 ml-4 py-2  duration-200 hover:bg-blue-100 hover:text-black rounded-full text-red-600'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn