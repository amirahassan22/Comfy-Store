import React from "react";
import SectionTitle from "../Components/sectionTitle";
import CartOrderTotal from "../Components/CartOrderTotal";
import CheckoutForm from "../Components/CheckoutForm";

export default function Checkout() {
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
