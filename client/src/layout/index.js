import React from 'react'
import logo from '../assets/logo.png'
const AuthLayouts = ({children}) => {
  return (
    <>
    <header className='flex justify-center items-center py-3  shadow-md bg-white'>
        <img 
        src= {logo}
        alt='logo'
        width={250}
        height={250}
        />
    </header>
    {children}
    </>
  )
}

export default AuthLayouts