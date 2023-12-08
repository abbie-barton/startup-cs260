import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './containers/login/Login';
import Home from './containers/home/Home';
import Account from './containers/account/Account';
import RecipeCatalog from './containers/recipeCatalog/RecipeCatalog';
import RecipePage from './containers/recipePage/RecipePage';
import UploadRecipe from './containers/uploadRecipe/UploadRecipe'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/*" element={<Login />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/account" element={<Account />} />
      <Route path="/recipe-catalog" element={<RecipeCatalog />} />
      <Route path="/recipe-page:id" element={<RecipePage />} />
      <Route path="/upload-recipe" element={<UploadRecipe />} />
    </Routes>
  );
}
