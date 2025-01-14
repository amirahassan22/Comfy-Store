import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductGrid from "./ProductGrid";
import { useLoaderData } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";

export default function ProductContainer() {
  const [layout,setLayout] = useState("grid");
  const { meta } = useLoaderData();
  const productsNumber = meta.pagination.total
  const layoutBtnStyle = (pattern)=>{
return `ms-4 text-xl btn btn-circle btn-sm ${pattern===layout ? 'btn-primary text-primary-content' : 'btn-ghost text-based-content'}`
  } 

  return (
    <section>
      <div className="flex justify-between items-center">
        <h4>{meta.pagination.total} Product{productsNumber > 1 && 's'}</h4>
        <div className="flex justify-center items-center">
          <button className={layoutBtnStyle('grid')} onClick={()=>{
            setLayout("grid");
            // setIsClicked(true)
            }}><BsFillGridFill /></button>
          <button className={layoutBtnStyle('list')} onClick={()=>setLayout("list")}><BsList/></button>
        </div>
      </div>
      {productsNumber<1 ? <h5>Not Matched products found......</h5> :layout=="grid"?<ProductGrid />:<ProductList />}
    </section>
  );
}
