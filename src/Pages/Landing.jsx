import React from 'react'
import Hero from '../Components/Hero'
import FeaturedProducts from '../Components/FeaturedProducts'
import customFetch from '../utils/index';
import SectionTitle from '../Components/sectionTitle';


const featuredProductsUrl = "/products?featured=true"; 

const featuredProductsQuery = {
  queryKey : ['featuredProducts'],
  queryFn : ()=> customFetch.get(featuredProductsUrl)
}
export const loader = (queryClient) => async()=>{
  const response =  await queryClient.ensureQueryData(featuredProductsQuery);
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
