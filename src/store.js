import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Features/Cart/CartSlice.js'
import userReducer from './Features/User/userSlice.js'
export const store = configureStore({
    reducer: {
        cart : cartReducer,
        user : userReducer
    }
})

