import React, {useEffect} from 'react'
import HomeContainer from 'components/HomeContainer'
import {motion} from 'framer-motion';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import RowContainer from 'components/RowContainer';
import { useState } from 'react';
import MenuContainer from 'components/MenuContainer';
import CartContainer from 'components/CartContainer';
import useCart from 'storeHandle/useCart';
import useFoods from 'storeHandle/useFoods';

const Maincontainer = () => {

  const {foodItems} = useFoods();
  const {cartShow} = useCart();

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);


  return (
   <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer/>

      <section className='w-full my-6'>
          <div className='w-full flex items-center justify-between'>
              <p className='text-2xl font-semibold capitalize text-headingColor  relative before:absolute
               before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before::left-0 before:bg-orange-500
               transition-all ease-in-out duration-100 before:bg-gradient-to-tr from-orange-400 to-orange-600
              '>
                Our fresh & healthy fruits
              </p>
              <div className='hidden md:flex gap-3 items-center'>
                <motion.div
                whileTap={{scale: 0.75}}
                className='w-8 h-8 rounded-lg bg-orange-300 hover:shadow-lg hover:bg-orange-500 cursor-pointer transition-all
                 duration-100 ease-in-out flex items-center justify-center'
                 onClick={() => setScrollValue(-200)}
                 >
                    <MdChevronLeft className='text-base text-white'/>
                </motion.div>
                <motion.div
                 whileTap={{scale: 0.75}}
                 className='w-8 h-8 rounded-lg bg-orange-300 hover:shadow-lg hover:bg-orange-500 cursor-pointer transition-all
                 duration-100 ease-in-out flex items-center justify-center'
                 onClick={() => setScrollValue(200)}
                 >
                  <MdChevronRight className='text-base text-white'/>
                </motion.div>
              </div>
          </div>
          <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(n => n.category === 'fruits')} />
      </section>

      <MenuContainer/>

     { cartShow && <CartContainer/>}

   </div>
  )
}

export default Maincontainer