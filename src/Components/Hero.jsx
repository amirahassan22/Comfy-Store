import React from "react";
import { Link } from "react-router-dom";
import img1 from './../assets/hero1.webp'
import img2 from './../assets/hero2.webp'
import img3 from './../assets/hero3.webp'
import img4 from './../assets/hero4.webp'


const carsoulImages = [img1,img2,img3,img4]
export default function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-full flex flex-col justify-center  ">
        <h1 className="text-gray-700 text-6xl font-bold capitalize mb-2">
          We are changing the way people shop
        </h1>
        <p className="font-normal text-gray-600 text-lg leading-8 pt-5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <Link
          to="product"
          className="btn btn-primary text-white w-44 hover:text-white mt-9"
        >
          OUR PRODUCTS
        </Link>
      </div>
      <div className="hidden lg:flex carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 m-auto">
        {carsoulImages.map((image,index)=>{
          return(
            <div key={index} className="carousel-item">
          <img
            src={image}
            className="rounded-box w-80 h-full object-cover"
          />
        </div>
          )
        })}
      </div>
    </div>
  );
}
