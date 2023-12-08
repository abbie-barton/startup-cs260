import React from "react";
import './header.css';
import Menu from '../../../assets/burger-menu.svg';

export default function Header() {
  return (
    <>
      <header>
      <div className="flex flex-row">
        <img id="logo" src="/assets/startupLogo.svg" alt="make it good logo" />
        <h1 className="text-4xl font-normal self-center">Make it Good</h1>
      </div>
      <ul>
        <li><a href="home.html">home</a></li>
        <li><a href="recipeCatalog.html">recipe catalog</a></li>
        <li><a href="uploadRecipe.html">upload recipe</a></li>
        <li><a href="account.html">my account</a></li>
      </ul>
    </header>
    </>
  );
}
