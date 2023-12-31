import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../globalStyles.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Kid from "../../../assets/baking-kid.jpg";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [joke, setJoke] = useState("");

  const getRecentRecipes = async () => {
    try {
      const response = await fetch("/api/recent-recipes");
      const data = await response.json();
      console.log(data);
      setRecipes(data);
    } catch {
      console.error("failed to fetch /recent-recipes");
    }
  };

  const getRandJoke = () => {
    fetch(`https://api.chucknorris.io/jokes/random`)
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.value);
      });
  };

  useEffect(() => {
    getRecentRecipes();
    getRandJoke();
  }, []);

  return (
    <>
      <Header />
      <div id="index-body" className="px-10">
        <div className="flex flex-row justify-center">
          <div className="px-10">
            <h2 className="py-4 font-semibold text-2xl">Most recent recipes</h2>
            <div
              id="recent-recipes"
              className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe.recipe} />
              ))}
            </div>
          </div>
          <div id="about" className="col-3 p-2">
            <h4 className="py-4 text-xl">About us</h4>
            <img
              src={Kid}
              alt="placeholder img"
              width="300"
              className="pb-4"
              id="about-img"
            />
            <p>
              We love being in the kitchen and we want to share our recipes with
              you! These website is a collection of recipes we've found and
              liked. Enjoy!
            </p>
            <h4 className="pt-4 font-normal text-lg">enjoy a joke</h4>
            <p>{joke}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
