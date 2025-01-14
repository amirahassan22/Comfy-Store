import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/index";

export default function SingleProductCard({ title, image, price, dist }) {
  const formattedPrice = formatPrice(price)

  
  return (
    <Link to={dist} className="card bg-base-100 shadow-xl hover:shadow-2xl">
      <figure className="w-full h-52 object-cover">
        <img src={image} alt={title} />
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title mx-auto">{title}</h2>
        <p>{formattedPrice}</p>
      </div>
    </Link>
  );
}
