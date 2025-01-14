import React from "react";
import { NavLink } from "react-router-dom"; 

export default function NavbarLinks({ link, text }) {
  return (
    <NavLink to={link}>{text}</NavLink>
  );
}
