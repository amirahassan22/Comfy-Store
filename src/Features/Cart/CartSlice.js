import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

let initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromStorage = ()=>{
    return JSON.parse(localStorage.getItem("order")) || initialState;
}


const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromStorage(),
  reducers: {
    addItem: (state, action) => {
      const { cartData } = action.payload;
      console.log(cartData);

      const product = state.cartItems.find(
        (item) => item.cartId == cartData.cartId
      );
      console.log(state.cartItems);
      if (product) {
        product.amount += cartData.amount;
      } else {
        state.cartItems.push(cartData);
      }
      state.numItemsInCart += cartData.amount;
      state.cartTotal += cartData.price * cartData.amount  
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item was added to cart")
      
    },
    deleteItem: (state, action) => {
      console.log(action.payload);
      const targetIItemId = action.payload.cartId;
      const targetItemAmount = action.payload.amount;
      const remainingItems = state.cartItems.filter(item=> item.cartId !== targetIItemId);
      state.cartItems = remainingItems;
      state.numItemsInCart -=  targetItemAmount;
      state.cartTotal -= action.payload.price * targetItemAmount;
      cartSlice.caseReducers.calculateTotals(state);
      // cartSlice.caseReducers.storeInLocalStorage(state);
      toast.error("item was removed from the cart");
    },
    editItem: (state, action) => {
      console.log(action.payload);
      const {cartId,amount} = action.payload;
      console.log(cartId);
      const target = state.cartItems.find(item=> item.cartId === cartId)
      state.numItemsInCart += amount - target.amount;
      state.cartTotal += target.price * (amount -target.amount)
      target.amount = amount;
      cartSlice.caseReducers.calculateTotals(state)
      toast.success("cart updated successfully")
    },
    clearCart: () => {
        cartSlice.caseReducers.storeInLocalStorage(initialState)
        return initialState;
    },
    calculateTotals : (state)=>{
        console.log(state.cartTotal);
        state.tax = 0.1 * state.cartTotal;
        state.orderTotal = state.cartTotal + state.shipping + state.tax;
        cartSlice.caseReducers.storeInLocalStorage(state)
    },
    storeInLocalStorage : (state)=>{
        localStorage.setItem("order", JSON.stringify(state));
    }
  },
});

export const { addItem, deleteItem, editItem, clearCart, getAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
