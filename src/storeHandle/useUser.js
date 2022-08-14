import { LOCAL_NAME_USER } from "context/initialState";
import { useStateValue } from "context/StateProvider"
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { app } from '../firebase.config';
import { actionType } from "context/reducer";
export default () => {
    const [{user}, dispatch] = useStateValue();


    const login = async () => {
        const firebaseAuth = getAuth(app);
        const provider = new GoogleAuthProvider();   
        const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
           dispatch({
              type: actionType.SET_USER,
              user: providerData[0]
           })
           localStorage.setItem(LOCAL_NAME_USER, JSON.stringify(providerData[0]));
    }

    const logout = () => {
        dispatch({
            type: actionType.SET_USER,
            user: null
         })
         localStorage.setItem(LOCAL_NAME_USER, null);
    }


    return {
        user,
        login,
        logout
    }
}