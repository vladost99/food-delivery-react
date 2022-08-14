import { actionType } from "context/reducer";
import { useStateValue } from "context/StateProvider"
import { LOCAL_NAME_CART_ITEMS } from "context/initialState";
export default () => {
    const [{cartItems, cartShow}, dispatch] = useStateValue();

   const clearCart = () => cartDispatch([])

   const handleCartShow = (value) => {
     dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: value
     })
   }

   const updateCartItem = (action, id) => {
    let updateData = cartItems.map(elem => {
        if(elem.id === id) {
          let val  = action === 'add' ? elem.qty + 1 : elem.qty - 1;
          val = val < 1 ? 1 : val;
          elem.qty = val;
        }
        return elem
      });

      cartDispatch(updateData)
   }

   const addToCart = (item) => {
        let items = [...cartItems];
        const indexItem = items.findIndex(el => el.id === item.id);

        if(indexItem >= 0) {
            items[indexItem].qty = items[indexItem].qty + 1;
        }
        else {
            items = [...items, {...item, qty: 1}];
        }


        cartDispatch(items);
   }

   const removeItem = (id) => {
    const updateData = cartItems.filter(el => el.id !== id);
    cartDispatch(updateData);
   }


  const cartDispatch = (updateData) => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updateData
    })
    localStorage.setItem(LOCAL_NAME_CART_ITEMS, JSON.stringify(updateData));
  }


  return {
    cartItems,
    cartShow,
    updateCartItem,
    clearCart,
    addToCart,
    handleCartShow,
    removeItem
  }

}