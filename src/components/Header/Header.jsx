import React from 'react'
import { Container ,Logo,LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Login',
      slug:'/login',
      active:!authStatus
    },
    {
      name:'Signup',
      slug:'/signup',
      active:!authStatus
    },
    {
      name:'My Posts',
      slug:'/my-posts',
      active:authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus
    }
  ]
  return (
    <header className=' shadow bg-blue-900'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 py-1 '>
            <Link t='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
  {navItems.map((item) =>
    (item.active && item.name !== 'Login') ? (
      <li key={item.name}>
        <button className='inline-block px-3 py-2 duration-200 my-1 hover:bg-blue-100 rounded-full mt-2 mb-2 text-blue-50 hover:text-black' onClick={() => navigate(item.slug)}>{item.name}</button>
      </li>
    ) : (item.active && item.name === 'Login') ? (
      <li key={item.name}>
        <button className='inline-block px-3 py-2 duration-200 my-1 hover:bg-green-100 bg-green-500 rounded-full mt-2 mb-2 text-blue-50 hover:text-black animate-pulse' onClick={() => navigate(item.slug)}>{item.name}</button>

      </li>
    ) : null
  )}
  {authStatus && (
    <li>
      <LogoutBtn />
    </li>
  )}
</ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header