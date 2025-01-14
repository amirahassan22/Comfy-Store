import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Features/Cart/CartSlice";
import CartList from "../Components/CartList";
import CartOrderTotal from "../Components/CartOrderTotal";
import SectionTitle from "../Components/sectionTitle";
import { Link } from "react-router-dom";

export default function Cart() {
  // const[isClicked,setIsClicked] =useState(false);
  const {numItemsInCart} = useSelector(state=> state.cart)
  const {user} = useSelector(state=> state.user);
  const dispatch = useDispatch();
  if(numItemsInCart == 0){
    return <h2 className="text-3xl font-medium tracking-wider my-10 pb-5">Your cart is empty :)</h2>
  }
  return (
    <div>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartOrderTotal />
          {user ? (
            <Link to="/checkout" className="btn btn-primary w-full mt-9">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary w-full mt-9">
              Please login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
