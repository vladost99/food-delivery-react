import { fetchCart, fetchUser } from './../utils/fetchLocalStorage';

export const LOCAL_NAME_CART_ITEMS = 'cartItems';
export const LOCAL_NAME_USER = 'user';

const userInfo = fetchUser(LOCAL_NAME_USER);
const cartInfo = fetchCart(LOCAL_NAME_CART_ITEMS);


const parseData = (data) => JSON.parse(JSON.stringify(data));

export const initialState = {
    user: parseData(userInfo),
    foodItems: null,
    cartShow: false,
    cartItems: parseData(cartInfo)
}