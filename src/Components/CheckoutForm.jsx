import React from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import customFetch, { formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../Features/Cart/CartSlice";
export const action = (store,queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const placeOrderData = Object.fromEntries(formData);
  const {cartItems,orderTotal,numItemsInCart} = store.getState().cart; // arr
  const orderData = {
    ...placeOrderData,
    cartItems,
    chargeTotal: orderTotal,
    numItemsInCart,
    orderTotal: formatPrice(orderTotal),
  };
  // const userToken = ;
  const headers = {
    Authorization: `Bearer ${store.getState().user.user.token}`,
  };
  try {
    const response = await customFetch.post(
      "/orders",
      { data: orderData },
      { headers: headers }
    );
    queryClient.removeQueries(['orders'])
    toast.success("your order is sent successfully");
    store.dispatch(clearCart())
    return redirect('/orders')
  } catch (error) {
    const errorMsg = error?.response?.data?.error?.message || "An error happened while placing your order"
    toast.error(errorMsg);
    if (error?.response?.status === 401 || 403) {
      return redirect("/login")
    }
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
