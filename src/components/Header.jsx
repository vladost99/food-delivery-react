import React from 'react'
import Profile from './Profile';
import {motion} from 'framer-motion';
import Brand from './Brand';
import Navigation from './Navigation';
import Basket from './Basket';
const Header = () => {



  return (
    <header className='fixed bg-primary z-50 w-[100%] p-3 px-4 md:p-6 md:px-16'>
        {/* desktop & table */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>
           <Brand/>

           <div className='flex items-center gap-8'>
                <motion.ul 
                initial={{opacity: 0, x: 200}}
                exit={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                 className='flex items-center gap-8'
                 >
                    <Navigation/>
                </motion.ul>

                <Basket/>

                 <Profile/>
           </div>
        </div>

        {/* mobile */}

        <div className='flex md:hidden justify-between w-full h-full'>
            <Basket/>
            <Brand/>
            <Profile/>
        </div>
    </header>
  )
}

export default Header