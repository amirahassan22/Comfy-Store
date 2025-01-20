import React, { useState } from "react";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function ComplexPagination() {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const { pathname, search } = useLocation();

  const navigate = useNavigate();
  const handlePageNum = (pageNumber) => {
    const urlParams = new URLSearchParams(search);
    urlParams.set("page", pageNumber);
    navigate(`${pathname}?${urlParams.toString()}`);
    console.log(pageNumber);
  };
  const AddPaginationButton = ({ pageNum, activeClass }) => {
    return (
      <button
        key={pageNum}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        } `}
        onClick={() => handlePageNum(pageNum)}
      >
        {pageNum}
      </button>
    );
  };
  const RenderButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(
      AddPaginationButton({ pageNum: 1, activeClass: page === 1 })
    );
    // dots before
    if (page > 2) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md border-none join-item">
          ...
        </button>
      );
    }
    // mid
    if (page > 1 && page < pageCount) {
      pageButtons.push(
        AddPaginationButton({ pageNum: page, activeClass: true })
      );
    }
    // dots after
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md border-none join-item">
          ...
        </button>
      );
    }
    // last button
    pageButtons.push(
      AddPaginationButton({
        pageNum: pageCount,
        activeClass: page === pageCount,
      })
    );

    return pageButtons;
  };
  if (pageCount < 2) return null;
  return (
    <div className=" mt-16 pb-3 flex justify-end">
      <div className="join ">
        <button
          className="join-item btn"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageNum(prevPage);
          }}
        >
          Prev
        </button>
        {RenderButtons()}
        <button
          className="join-item btn"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageNum(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
