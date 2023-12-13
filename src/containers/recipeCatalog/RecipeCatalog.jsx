import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function RecipeCatalog() {
  const [recipes, setRecipes] = useState([]);

  const getRecentRecipes = async () => {
    try {
      const response = await fetch("/api/recent-recipes");
      const data = await response.json();
      setRecipes(data);
    } catch {
      console.error("failed to fetch /all-recipes");
    }
  };

  useEffect(() => {
    getRecentRecipes();
  }, [])

  return (
    <>
      <Header />
      <div className="container text-start py-4">
        <div className="row g-2">
          <div id="recent-recipes" className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe.recipe} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
