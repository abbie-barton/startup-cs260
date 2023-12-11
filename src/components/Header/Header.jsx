import React from "react";
import "./header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "") {
      setIsLoginPage(true);
    }
  }, [location]);

  return (
    <>
      <header>
        <div className="flex flex-row">
          <img
            id="logo"
            src="/assets/startupLogo.svg"
            alt="make it good logo"
          />
          <h1 className="text-4xl font-normal self-center">Make it Good</h1>
        </div>
        {isLoginPage ? (
          ""
        ) : (
          <ul>
            <li>
              <NavLink to="home">home</NavLink>
            </li>
            <li>
              <NavLink to="recipe-catalog">recipe catalog</NavLink>
            </li>
            <li>
              <NavLink to="upload-recipe">upload recipe</NavLink>
            </li>
            <li>
              <NavLink to="account">my account</NavLink>
            </li>
          </ul>
        )}
      </header>
    </>
  );
}
