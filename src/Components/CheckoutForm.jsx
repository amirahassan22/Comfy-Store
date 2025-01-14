import React from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import { store } from "./../store.js";
import customFetch, { formatPrice } from "../utils";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const placeOrderData = Object.fromEntries(formData);
  const itemsInCart = store.getState().cart.cartItems; // arr
  const chargeTotal = store.getState().cart.orderTotal;
  const totalAmount = store.getState().cart.numItemsInCart;
  const orderData = {
    ...placeOrderData,
    cartItems: itemsInCart,
    chargeTotal: chargeTotal,
    numItemsInCart: totalAmount,
    orderTotal: formatPrice(chargeTotal),
  };
  const userToken = store.getState().user.user.token;
  const headers = {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await customFetch.post(
      "/orders",
      { data: orderData },
      { headers: headers }
    );
    console.log(response);
    toast.success("your order is sent successfully");
    return redirect('/orders')
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    return null;
  }

  
};

export default function CheckoutForm() {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <button
          className="btn btn-primary btn-block text-white mb-3"
          type="submit"
        >
          Place Your Order
        </button>
      </div>
    </Form>
  );
}
