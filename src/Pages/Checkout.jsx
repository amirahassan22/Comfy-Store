import React from "react";
import SectionTitle from "../Components/sectionTitle";
import CartOrderTotal from "../Components/CartOrderTotal";
import CheckoutForm from "../Components/CheckoutForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => ()=>{
  const user = store.getState().user.user;
  if (!user) {
    toast.warn("you have to login first");
    return redirect("/login")
  }
  return null;
}

export default function Checkout() { 
  const {cartTotal} = useSelector(state=>state.cart);
  if (cartTotal === 0) {
    return <SectionTitle text='YOU CART IS EMPTY'/>
  }
  return (
    <>
    <SectionTitle text='place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartOrderTotal />
      </div>
    </>
  );
}
