import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'img/avatar.png';
import {motion} from 'framer-motion';
import {MdAdd, MdLogout} from 'react-icons/md';
import useClickOutside from 'hooks/useClickOutside';
import Navigation from './Navigation';
import useUser from 'storeHandle/useUser';

const Profile = () => {

    const {user, login: loginHook, logout: logoutHook} = useUser(); 
   
    const [isMenu, setIsMenu] = useState(false);

     const login = async () =>  {
        if(!user) {
           await loginHook();
        } else {
            setIsMenu(!isMenu);
        }
     }

   const closeMenu = () => setIsMenu(false);  

   const ref = useClickOutside(closeMenu);  

   const logout = () => {
        closeMenu();
        logoutHook();
   }
     


  return (
    <div className='relative'>
                    <motion.img
                    whileTap={{scale: 0.6}}
                    ref={ref}
                    className='w-10 min-w-[40px] rounded-full h-10 min-h-[40px] drop-shadow-xl cursor-pointer'
                    src={user ? user?.photoURL : Avatar} alt='Avatar'
                    onClick={login}
                    />

                   {
                    isMenu && (
                        <motion.div 
                           initial={{opacity: 0, scale: 0.6}}
                           animate={{opacity: 1, scale: 1}}
                           exit={{opacity: 0, scale: 0.6}}
                           className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0'
                           >
                        <Link to={'/createItem'}>
                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor'>New Item <MdAdd/></p>
                        </Link>
                        <ul className='md:hidden flex flex-col gap-2 ml-4'>
                         <Navigation/>
                        </ul>
                       <p onClick={logout} className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-300 m-2 p-2 rounded-md shadow-md transition-all duration-100 ease-in-out text-base bg-gray-200'>Logout <MdLogout/></p>
                     </motion.div> 
                    )
                   }    

    </div>
  )
}

export default Profile