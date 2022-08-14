import React from 'react';
import {MdShoppingBasket} from 'react-icons/md';
import useCart from 'storeHandle/useCart';

const Basket = () => {

  const {handleCartShow, cartItems} = useCart();

  return (
    <div onClick={() => handleCartShow(true)} className='relative flex items-center justify-center'>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
              { cartItems && cartItems.length > 0 && ( <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                    <p className='text-xs text-white font-semibold flex items-center justify-center'>{cartItems.length}</p>
                </div>)}
    </div>
  )
}

export default Basket