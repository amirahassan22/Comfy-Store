import React, { useState } from "react";
import customFetch from "../utils";
import Filter from "../Components/Filter";
import ProductContainer from "../Components/ProductContainer";
import Pagination from "../Components/Pagination";

// export const action = async()=>{
//   const response = await customFetch.get('/products?search=s&category=all&company=all&order=a-z&price=100000&shipping=true');
//   console.log(response);
//   console.log("tamam");
  
//   return null;
// }

export const loader = async ({ request}) => {
  console.log(request);
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  console.log(params);
  const filteredProducts = await customFetch.get('/products',{params});
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
