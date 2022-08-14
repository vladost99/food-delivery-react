import React from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import {BiMinus, BiPlus} from 'react-icons/bi';
import {IoIosTrash} from 'react-icons/io'
import useCart from 'storeHandle/useCart';
import { pricePrefix } from 'utils/pricePrefix';
import { useState } from 'react';
const CartItem = ({item}) => {

  const {updateCartItem, removeItem} = useCart();
  

  const [isDelete, setIsDelete] = useState(false);


  const remove = () => {
    setIsDelete(true);
    setTimeout(() => removeItem(item.id), 300);
    //removeItem(item.id);
  }

  const variants = {
    remove: {x: '1000%', transition: {duration: 0.3}},
    initial:{x: 0}
  }


  return (
     <motion.div
     variants={variants}
     animate={isDelete ? 'remove' : 'initial'}   
     className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
                    <img 
                      src={item.imageURL}
                      className='w-20 h-20 max-w-[60px] rounded-full object-contain'
                    />
                    <div className='flex flex-col gap-2'>
                        <p className='text-base text-gray-50'>
                            {item.title}
                        </p>
                        <p className='text-sm  flex items-center  text-gray-300 font-semibold'>
                            {pricePrefix}{item?.price * item.qty}

                            <span onClick={remove} className='ml-2 cursor-pointer text-lg bg-red-600 w-30 h-30 rounded-lg text-white'>
                              <IoIosTrash/>
                            </span>
                        </p>
                    </div>

                    <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                        <motion.div onClick={() => updateCartItem('remove', item.id)} className='text-gray-50'  whileTap={{scale: 0.75}}>
                           <BiMinus/>         
                        </motion.div>
                        <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>{item.qty}</p>
                        <motion.div onClick={() => updateCartItem('add', item.id)}  className='text-gray-50' whileTap={{scale: 0.75}}>
                            <BiPlus/>
                        </motion.div>
                    </div>
    </motion.div>
  )
}

export default CartItem