import React from "react";
import CookImg from "../../../assets/cooker.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState({});
  const [contributedRecipes, setContributedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userName");
    fetch(`/api/auth/logout`, {
      method: "delete",
    }).then(() => navigate("/"));
  };

  const getUser = async (userName) => {
    // See if we have a user with the given email.
    let user;
    try {
      const response = await fetch(`/api/user/full/${userName}`);
      const data = response.json();
      user = data;
    } catch {
      console.error("failed to get user info");
    }
    return user;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(localStorage.getItem("userName"));
      console.log(user.user.userName);
      setUser(user.user);
      setContributedRecipes(user.user.contributedRecipes);
      setFavoritedRecipes(user.user.favoritedRecipes);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-row text-start items-center justify-center py-4 mx-16">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <img src={CookImg} alt="default profile picture" width="200" />
              </div>
              <h3 id="display-userName" className="text-center font-semibold text-2xl py-2">
                {user.userName}
              </h3>
              <p id="display-description" className="text-center py-2">
                expert chef
              </p>
              <button
                type="reset"
                className="btn btn-outline-dark"
                onClick={logout}
              >
                logout
              </button>
            </div>

            <div>
              <h2 className="py-2 font-normal text-lg">Contributed Recipes</h2>
              <div className="container text-start">
                <div id="contributed-recipes" className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 rounded w-full">
                  {contributedRecipes == [] ? (
                    contributedRecipes.map((recipe, index) => (
                      <RecipeCard key={index} recipe={recipe}/>
                    ))
                  ) : (
                    <p className="pt-3">
                      You don't have any contributed recipes yet!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col bg-light p-4 rounded">
            <h2 className="font-normal text-lg">My favorited recipes</h2>
            <p>
              click the heart icon on a recipe page to favorite a recipe and
              come back to it later!
            </p>
            <div className="container text-start">
              <div id="favorited-recipes" className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-light p-4 rounded w-full">
                {favoritedRecipes ? (
                  favoritedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                  ))
                ) : (
                  <p className="pt-3">
                    You don't have any favorited recipes yet!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
