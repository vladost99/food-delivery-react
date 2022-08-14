import React, { useEffect, useRef } from 'react';
import Notfound from 'img/NotFound.svg';
import RowItem from './RowItem';
import {motion} from 'framer-motion';

const RowContainer = ({flag, data, scrollValue}) => {
  
  const rowContainerRef = useRef();
  
  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue
  }, [scrollValue])


  return (
    <motion.div
     ref={rowContainerRef}
     drag
     className={`w-full flex items-center p-2 gap-3 my-12  scroll-smooth
    ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}
    
    `}>
    {data && data.length > 0 ? (
        data.map((item) => (
          <RowItem key={item.id} item={item}/>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={Notfound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default RowContainer