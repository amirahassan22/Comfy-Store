import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarLinks from "./NavLinks.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/User/userSlice.js";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function Navbar() {
  const dispatch = useDispatch();
  const { numItemsInCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  const navLinks = [
    { id: 1, link: "/", text: "Home" },
    { id: 2, link: "about", text: "About" },
    { id: 3, link: "products", text: "Products" },
    { id: 4, link: "cart", text: "Cart" },
    { id: 5, link: "checkout", text: "Checkout" },
    { id: 6, link: "orders", text: "Orders" },
  ];

  return (
    <nav className="bg-base-200">
      <div className="navbar align-items">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((navLink) => {
                return (
                  <li key={navLink.id}>
                    <NavbarLinks link={navLink.link} text={navLink.text} />
                  </li>
                );
              })}
            </ul>
          </div>
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-xl bg-primary text-white hover:text-white"
          >
            C
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((navLink) => {
              if((navLink.link === 'checkout' || navLink.link === 'orders') && !user) return null;
                  return (
                    <li key={navLink.id}>
                      <NavbarLinks link={navLink.link} text={navLink.text} />
                    </li>
                  );
                })
              }
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate me-3">
            <input type="checkbox" onChange={changeTheme} />
            {/* sun icon*/}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* moon icon*/}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          <div className="relative">
            <NavbarLinks
              link={"cart"}
              text={
                <>
                  <svg
                    className="w-6 h-6  text-gray-800 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    />
                  </svg>
                  <span className="w-5 h-5 rounded-full bg-primary absolute  -top-3 -right-2 text-white flex justify-center items-center">
                    {numItemsInCart}
                  </span>
                </>
              }
            ></NavbarLinks>
          </div>
        </div>
      </div>
    </nav>
  );
}
