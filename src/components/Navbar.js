import React from "react";
import "../styles/navbar.css";
import { auth } from "../firebase/firebase";

const Navbar = () => {
  return <div className="navbar">{auth.currentUser.uid}</div>;
};

export { Navbar };
