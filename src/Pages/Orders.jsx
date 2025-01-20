import React from "react";
import customFetch from "../utils";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import SectionTitle from "../Components/sectionTitle.jsx";
import OrderList from "../Components/OrderList.jsx";
import ComplexPagination from "../Components/ComplexPagination.jsx";

const orderQuery = (params,user) =>{
  return{
    queryKey:['orders',user.username,params.page ?parseInt(params.page) : 1 ],
    queryFn : ()=> customFetch(`/orders`, {params, headers: {
      Authorization: `Bearer ${user.token}`,
    } })
  }
}

export const loader =
  (store,queryClient) =>
  async ({ request }) => {
    const user = store.getState().user.user;
    if (!user) {
      toast.warn("you should login first");
      return redirect("/login");
    }
    const entries = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // const userToken = store.getState().user.user.token;
    try {
      const response = await queryClient.ensureQueryData(orderQuery(entries,user))

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        "An error happened while Displaying your order";
      toast.error(errorMsg);
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
  };
export default function Orders() {
  const { orders, meta } = useLoaderData();

  return (
    <div>
      <SectionTitle text="Your Orders" />
      <hr />
      <OrderList orders={orders} meta={meta} />
      <ComplexPagination />
    </div>
  );
}
