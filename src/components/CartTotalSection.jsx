import React from 'react'
import {motion} from 'framer-motion'
import { pricePrefix } from 'utils/pricePrefix'
import useCart from 'storeHandle/useCart'
import useUser from 'storeHandle/useUser'
const CartTotalSection = () => {

 const {cartItems} = useCart(); 
 const {user, login} = useUser();  
 const subTotalValue = cartItems.reduce((acc, item) => acc + (item.price * item.qty),0).toFixed(2);
 const totalValue = (Number(subTotalValue) + 2.5).toFixed(2);

  return (
    <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center
    justify-evenly px-8 py-2'>
      <div className='w-full flex items-center justify-between'>
          <p className='text-gray-400 text-lg'>
              Sub Total
          </p>
          <p className='text-gray-400 text-lg'>
              {pricePrefix}{subTotalValue}
          </p>
      </div>
      <div className='w-full flex items-center justify-between'>
          <p className='text-gray-400 text-lg'>
              Delivery
          </p>
          <p className='text-gray-400 text-lg'>
              {pricePrefix}2.5
          </p>
      </div>
      <div className='w-full border-b border-gray-600 my-2'></div>

      <div className='w-full flex  items-center justify-between'>
          <p className='text-gray-200 text-xl font-semibold'>Total</p>
          <p className='text-gray-200 text-xl font-semibold'>{pricePrefix}{totalValue}</p>
      </div>
      { user  ? (<motion.button
       whileTap={{scale: 0.8}}
       type='button'
       className='w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2
        hover:shadow-lg
       '
      >
          Check out    
      </motion.button>)
     :   (<motion.button
        whileTap={{scale: 0.8}}
        type='button'
        onClick={login}
        className='w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2
         hover:shadow-lg
        '
       >
           Login   
       </motion.button>)
    }
  </div>
  )
}

export default CartTotalSection