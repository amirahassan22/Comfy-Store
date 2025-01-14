import React, { useState } from "react";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function Pagination() {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const {pathname,search} = useLocation();
    
    
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  console.log(pages);
const navigate = useNavigate()
  const handlePageNum = (pageNumber) => {
    const urlParams = new URLSearchParams(search)
    urlParams.set("page",pageNumber)
    navigate(`${pathname}?${urlParams.toString()}`)

    console.log(pageNumber);
    
    
  };
  if (pageCount < 2) return null;
  return (
    <div className=" mt-16 pb-3 flex justify-end">
      <div className="join ">
        <button className="join-item btn" onClick={() => {
          let prevPage = page - 1; 
          if (prevPage < 1)  prevPage = pageCount;
          handlePageNum(prevPage)
          }}>
          Prev
        </button>
        {pages.map((pageBtn) => {
          return (
            <button
              key={pageBtn}
              className={`btn btn-xs sm:btn-md border-none join-item ${pageBtn == page ? 'bg-base-300 border-base-300': ""} `}
              onClick={() => handlePageNum(pageBtn)}
            >
              {pageBtn}
            </button>
          );
        })}
        <button className="join-item btn" onClick={() =>{ 
          let nextPage = page + 1; 
          if (nextPage > pageCount)  nextPage = 1;
          handlePageNum(nextPage)
          }}>
          
          Next
        </button>
      </div>
    </div>
  );
}
