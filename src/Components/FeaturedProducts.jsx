import React from "react";
import {useLoaderData } from "react-router-dom";
import SingleProductCard from "./SingleProductCard";
import SectionTitle from "./sectionTitle";

export default function FeaturedProducts() {
   const {data} = useLoaderData()
 
  console.log(data);
  return (
    <div>
      <SectionTitle text='Featured Products'/>
      <div className="grid grid-cols-3 gap-10 px-5">
        {data.map((product) => {
          const { image, title, price } = product.attributes;

          return (
            <SingleProductCard key={product.id} image={image} title={title} price={price} dist={`products/:${product.id}`} />
          );
        })}
      </div>
    </div>
  );
}
