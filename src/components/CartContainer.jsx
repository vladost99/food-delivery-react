import React from 'react';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import {RiRefreshFill} from 'react-icons/ri';
import {motion} from 'framer-motion';
import CartItem from './CartItem';
import CartTotalSection from './CartTotalSection';
import EmptyCart from 'img/emptyCart.svg';
import useCart from 'storeHandle/useCart';

const CartContainer = () => {

  const {clearCart,handleCartShow, cartItems} = useCart();

  return (
    <motion.div 
     initial={{opacity: 0, x: 200}}
     animate={{opacity: 1, x: 0}}
     exit={{opacity: 0, x: 200}}
    className='fixed top-0 z-[101] right-0  w-full md:w-[520px] h-screen bg-white drop-shadow-md flex flex-col'
    >
        
        
        <div className='w-full flex items-center justify-between p-4'>
            <motion.div onClick={() => handleCartShow(false)}  whileTap={{scale: 0.75}}>
                <MdOutlineKeyboardBackspace
                className='text-textColor text-3xl cursor-pointer'
                />
            </motion.div>
            <p className='text-textColor text-l font-semibold'>Cart</p>
            <motion.p onClick={clearCart} whileTap={{scale: 0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md
                 hover:shadow-md  cursor-pointer text-textColor
                 text-base
            '>Clear <RiRefreshFill/></motion.p>
        </div>

        { cartItems && cartItems.length > 0 ? (
       <>
          <motion.div layout className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
           {cartItems && cartItems.length > 0 && (
             cartItems.map(item => (
              <CartItem item={item} key={item.id} />
             ))
           )}
        </motion.div>

      <CartTotalSection/>
       </>
      )
      : (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={EmptyCart} className='w-300' />
          <p className='text-xl text-textColor font-semibold'>
            Add some items to your cars
          </p>
        </div>
      )
     
    }
    </motion.div>
  )
}

export default CartContainer