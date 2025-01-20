import React, { useState } from "react";
import customFetch from "../utils";
import Filter from "../Components/Filter";
import ProductContainer from "../Components/ProductContainer";
import Pagination from "../Components/Pagination";

const productsQuery = (queryParams)=> {
  const {search,category,company,order,price,shipping,page} = queryParams;
  return {
    queryKey : ['allProducts' , search ?? "" , category ?? "all" , company ?? "all", order ?? "a-z" , price ?? 100000 ,shipping ?? false, page ?? 1],
    queryFn : ()=> customFetch.get('/products',{params:queryParams}) 
  }
}; 
export const loader = (queryClient) => async ({ request}) => {
  console.log(request);
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  console.log(params);
  const filteredProducts = await queryClient.ensureQueryData(productsQuery(params));
  console.log(filteredProducts);
  
  const {data ,meta} = filteredProducts.data;
  return  {data,meta,params};
};

export default function Products() {
 
  return (
    <main>
      <Filter />
      <ProductContainer/>
      <Pagination/>
    </main>
  );
}
