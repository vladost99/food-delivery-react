import React from 'react';
import {Link} from 'react-router-dom';
import Logo from 'img/logo.png';
const Brand = () => {
  return (
    <Link to={'/'} className='flex items-center gap-2'>
        <img src={Logo} className='w-8 object-cover' alt='Logo' />
        <p className='text-headingColor text-xl font-bold'>City</p>
   </Link>
  )
}

export default Brand