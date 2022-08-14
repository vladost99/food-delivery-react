import Header from "components/Header";
import {Routes, Route} from 'react-router-dom';
import MainContainer from "screens/MainContainer";
import CreateContainer from "screens/CreateContainer";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import useFoods from "storeHandle/useFoods";
const App = () => {

  const {getAllFoodItemsDB} = useFoods();

  useEffect(() => {
    getAllFoodItemsDB()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-[100] h-auto flex flex-col bg-primary'>
      <Header/>
      <main className="mt-14 md:px-16 md:mt-20 py-4 px-4 w-full">
        <Routes>
            <Route path="/*" element={<MainContainer/>} />
            <Route path="/createItem" element={<CreateContainer/>} />
        </Routes>
      </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
