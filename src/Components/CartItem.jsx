import React from "react";
import { formatPrice, generateArray } from "../utils";
import { useDispatch } from "react-redux";
import { deleteItem, editItem } from "../Features/Cart/CartSlice";

export default function CartItem({productData}) {
    const { cartId, title, price, image, amount, company, productColor }  = productData;
    const dispatch = useDispatch()
    const handleAmount = (e)=>{
      dispatch(editItem({cartId,amount: parseInt(e.target.value)}))
    }
    const removeItemFromCart =()=>{
      dispatch(deleteItem({cartId,amount,price}))
    }
  return (
    <article
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            defaultValue={amount}
            onChange={handleAmount}
          >
            {generateArray(amount+5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromCart}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
}
