import React, {useState} from 'react';
import {motion} from 'framer-motion';
import Loader from 'components/Loader';
import CurrencyInput from 'react-currency-input-field';
import ProgressBar from 'components/ProgressBar';
import SmallLoader from 'components/SmallLoader';
import {MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney} from 'react-icons/md';
import { categories } from 'utils/data';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebase.config';
import { saveItem } from 'utils/firebaseFunctions';
import useFoods from 'storeHandle/useFoods';

const CreateContainer = () => {

  const {getAllFoodItemsDB} = useFoods();

  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setLoadingImage] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [progress, setProgress] = useState('0%');


  const uploadImage = async (e) =>  {
     setLoadingImage(true);
     const imageFile = e.target.files[0];
     const storageRef = ref(storage, `food-fast/${Date.now()}-${imageFile.name}`);
     const uploadTask = uploadBytesResumable(storageRef, imageFile);

     uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(`${uploadProgress}%`);
     },
      (error) => {
        showErrorMessage('Error while uploading : Try Again')
      },
       () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
          showSuccessMessage('Image uploaded successfully', () => setImageAsset(downloadUrl))
        }).finally(() => setLoadingImage(false))
       }
       )
  }

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      showSuccessMessage('Image deleted successfully', () =>  setImageAsset(null))
    })
  }

  const saveDetails =  () => {
      setIsLoading(true);
      try {
         if((!title || !calories || !imageAsset || !price || !category)) {
          showErrorMessage('Required fields cant be empty')
         }
         else {
          const data = {
            id: `${Date.now()}`,
            title: title,
            imageURL: imageAsset,
            category: category,
            calories: Number(calories),
            qty: 1,
            price: Number(price)
          };

          //console.log(data);
          saveItem(data);
          showSuccessMessage('Data uploaded successfully', null, true);
          getAllFoodItemsDB();
         }
      }
      catch(e) {
       
      }
  }


  const clearData = () => {
    setTitle('');
    setImageAsset(null);
    setCalories("");
    setPrice('');
    setCategory('');
  } 


  const showSuccessMessage = (msg, callback = null, isclear = false) => {
    if(callback) callback();
    setIsLoading(false);
    setFields(true);
    setMsg(msg);
    setAlertStatus('success');
        setTimeout(() => {
        setFields(false);
        if(isclear) clearData()
        }, 4000);
  }  
  

  const showErrorMessage = (msg) => {
    setFields(true);
    setMsg(msg);
    setAlertStatus('danger');
    setTimeout(() => {
        setFields(false);
        setIsLoading(false);
    }, 4000)
  }



  return (
    <div className='w-full h-auto min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
          {
            fields && (
              <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={`w-full p-2 text-lg font-semibold rounded-lg text-center ${
                alertStatus === 'danger'
                 ? 'bg-red-400 text-red-800'
                 : 'bg-emerald-400 text-emerald-800'
                 }`}>
                {msg}
              </motion.p>
            )
          }
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
              <MdFastfood className='text-xl text-gray-700'/>
              <input 
               type='text'
               required
               value={title}
               placeholder='Give me a title...'
               className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'
               onChange={(e) => setTitle(e.target.value)}
                  />
          </div>
          <div className='w-full'>
            <select value={category} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer' onChange={(e) => setCategory(e.target.value)}>
              <option value='' className='bg-white'>Select Category</option>
              {categories && categories.map(item => (
                 <option key={item.id} value={item.urlParamName} className='bg-white text-base border-0 outline-none capitalize text-headingColor'>
                  {item.name}
                 </option>
              ))}
            </select>
          </div>
          <div className='group flex justify-center items-center flex-col
           border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer
           rounded-lg'>
              {isLoadingImage 
               ? (<div className='flex w-[300px] flex-col justify-center items-center gap-2'>
                  <Loader/>
                  <ProgressBar width={progress}/>
                 </div>)
                : <>
                  {!imageAsset
                   ? <>
                      <label className='w-full h-full flex flex-col items-center
                       justify-center cursor-pointer' 
                       >
                        <div className='w-full h0full flex flex-col items-center justify-center gap-2'>
                            <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
                            <p className='text-gray-500  hover:text-gray-700'>Click here to upload</p>
                        </div>
                        <input 
                         className='w-0 h-0'
                         onChange={e => uploadImage(e)}
                         type='file'
                         name='uploadimage'
                          accept='image/*'
                             />
                       </label>
                     </> 
                   
                   : <>
                      <div className='relative h-full'>
                        <img 
                         src={imageAsset}
                         alt='Uploaded image'
                         className='w-full h-full object-cover' 
                          />
                        <button 
                         type='button'
                         className='absolute bottom-3 right-3
                          p-3 rounded-full bg-red-500 text-xl
                          cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                          onClick={deleteImage}
                         >
                          <MdDelete className='text-white'/>
                         </button>
                      </div>
                   </>}
                 </>
               }
          </div>
          <div className='w-full flex flex-col md:flex-row gap-3'>
               <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                  <MdFoodBank className='text-gray-700 text-2xl'/>
                  <CurrencyInput
                      id="input-calories"
                      name="input-calories"
                      defaultValue={0}
                      placeholder='Calories'
                      className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400'
                      decimalsLimit={2}
                      value={calories}
                      onValueChange={(value, name) => setCalories(value)}
                    />
               </div>

               <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                  <MdAttachMoney className='text-gray-700 text-2xl'/>
                  <CurrencyInput
                      id="input-price"
                      name="input-price"
                      defaultValue={0}
                      placeholder='Price'
                      className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400'
                      decimalsLimit={2}
                      value={price}
                      onValueChange={(value, name) => setPrice(value)}
                    />
               </div>
          </div>

          <div className='flex items-center w-full'>
              <button
                type='button'
                className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500
                 px-12 py-2 rounded-lg text-lg text-white font-semibold
                '
                onClick={saveDetails}
              >
                {isLoading &&  <SmallLoader />}Save
                </button>  
          </div>
      </div>
    </div>
  )
}

export default CreateContainer