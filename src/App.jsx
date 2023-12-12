import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Account from "./containers/account/Account";
import RecipeCatalog from "./containers/recipeCatalog/RecipeCatalog";
import RecipePage from "./containers/recipePage/RecipePage";
import UploadRecipe from "./containers/uploadRecipe/UploadRecipe";
import Home from "./containers/home/Home";
import Login from "./containers/login/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/recipe-catalog" element={<RecipeCatalog />} />
        <Route path="/recipe-page/:id" element={<RecipePage />} />
        <Route path="/upload-recipe" element={<UploadRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}
