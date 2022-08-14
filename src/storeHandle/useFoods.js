import { useStateValue } from "context/StateProvider"
import { getAllFoodItems } from "utils/firebaseFunctions";
import { actionType } from "context/reducer";
export default () => {
    const [{foodItems}, dispatch] = useStateValue();

    const getAllFoodItemsDB = async () => {
      let data = await  getAllFoodItems();
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
       })
    }


    return {
        foodItems,
        getAllFoodItemsDB
    }
}