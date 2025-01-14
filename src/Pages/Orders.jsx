import React from "react";
import customFetch from "../utils";
import { store } from "./../store.js";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../Components/sectionTitle.jsx";
import Pagination from "../Components/Pagination.jsx";
import { clearCart } from "../Features/Cart/CartSlice";

export const loader = async () => {
  const userToken = store.getState().user.user.token;
  const headers = {
    Authorization: `Bearer ${userToken}`,
    // "Content-Type": "application/json",
  };
  try {
    const response = await customFetch("/orders", { headers: headers });
    // console.log(response);
    store.dispatch(clearCart())
    return { orders: response.data.data, meta: response.data.meta };
  } catch (error) {
    toast.error("check your credintials");
    return null;
  }
};
export default function Orders() {
  const { orders, meta } = useLoaderData();
  console.log(orders);
  console.log(meta);

  return (
    <div>
      <SectionTitle text="Your Orders" />
      <hr />
      <div>
        <p>total orders : {meta.pagination.total}</p>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((order) => {
                const { address, createdAt, numItemsInCart, orderTotal, name } = order.attributes;
                console.log(new Date(createdAt).toDateString());
                
                return (
                  <tr key={order.id}>
                    <th>{name}</th>
                    <td>{address}</td>
                    <td>{numItemsInCart}</td>
                    <td>{orderTotal}</td>
                    <td>{createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Pagination/> */}
    </div>
  );
}
