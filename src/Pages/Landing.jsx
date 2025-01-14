import React from 'react'
import Hero from '../Components/Hero'
import FeaturedProducts from '../Components/FeaturedProducts'
import customFetch from '../utils/index';


const featuredProductsUrl = "/products?featured=true"; 

export const loader = async()=>{
  const response =  await customFetch.get(featuredProductsUrl);
  return response.data;
}

export default function Landing() {

  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    </>
  )
}
