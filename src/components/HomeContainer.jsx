import React from 'react';
import Delivery from 'img/delivery.png';
import HeroBg from 'img/heroBg.png';
import { heroData } from 'utils/data';
import { pricePrefix } from 'utils/pricePrefix';


const HomeContainer = () => {

  return (
    <section id='home'  className='grid grid-cols-1 md:grid-cols-2 gap-2 h-[calc(100% - 88px)] overflow-hidden'>
    <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
      <div className='flex items-center rounded-full gap-2 justify-center bg-orange-100 px-4 py-1'>
        <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
          <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
            <img 
             className='w-full h-full object-contain'
             src={Delivery}
             alt="Delivery"

              />
          </div>
      </div>

      <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
        The Fastest Delivery in
        <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span>
      </p>

      <p className='md:text-left text-center md:w-[80%] text-base text-textColor'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
      qaque fugit distinctio est nam voluptatum architecto, porro iusto 
      </p>

      <button 
      type='button' 
      className='w-full md:w-auto  hover:shadow-lg transition-all ease-in-out duration-100  px-4 py-2 rounded-lg  bg-gradient-to-br from-orange-400 to-orange-500'
      
      >Order now</button>
    </div>
    <div className='py-2 flex-1  h-400 flex relative flex-items-center'>
      <img src={HeroBg} className='ml-auto h-420 w-full lg:w-auto lg:h-650' alt='hero-bg' />
       <div className='overflow-y-auto w-full h-full absolute top-0 right-0 flex items-center justify-center   py-4 gap-4 flex-wrap'>
            {
              heroData && heroData.map(n => (
                <div key={n.id} className=' lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
                  <img className='w-20  lg:w-40 -mt-10 lg:-mt-[2.5rem]' src={n.imageSrc} />
                  <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{n.name}</p>
                  <p className='text-[12px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3'>{n.decp}</p>
                  <p className='text-sm font-semibold text-headingColor'>
                    <span className='text-xs text-red-600'>{pricePrefix}</span> {n.price}
                  </p>
                </div>
              ))
            }
       </div>
    </div>
   </section>
  )
}

export default HomeContainer