// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex border space-x-4 items-center pl-2 py-2">
      <Link to="/">
        <img className="w-[70px]" src={logo} alt="IMDB Logo" />
      </Link>
      <Link to="/movies" className="text-blue-500 text-3xl font-bold">
        Movies
      </Link>
      <Link to="/watchlist" className="text-blue-500 text-3xl font-bold">
        Watchlist
      </Link>
    </div>
  );
};

export default Navbar;
