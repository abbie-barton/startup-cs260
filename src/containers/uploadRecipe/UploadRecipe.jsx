import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

export default function uploadRecipe() {
  const [title, setTitle] = useState("");
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");

  const saveRecipe = () => {
    if (
      servings &&
      time &&
      title &&
      description &&
      ingredients &&
      directions
    ) {
      // parse ingredients & instructions into an array of strings
      const parsedIngredients = ingredients.split("\n");
      const parsedInstructions = directions.split("\n");
  
      const date = new Date();
      const dateString = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
  
      const newRecipe = {
        // since localStorage can only hold strings, image for now will only hold file path and will not be displayed
        id: generateRandomId(),
        image: null,
        title: title,
        servings: servings,
        time: time,
        description: description,
        ingredients: parsedIngredients,
        instructions: parsedInstructions,
        author: localStorage.getItem("userName"),
        date: dateString,
        createdBy: date,
        comments: [],
      };
  
      postRecipe(newRecipe);
      saveContribution(newRecipe.author, newRecipe);
  
      // give user confirmation - your recipe was uploaded!
      alert("Your recipe was uploaded successfully.")
      location.reload();
    } else {
      alert("please fill in all fields");
    }
  };

  const postRecipe = async (recipe) => {
    try {
      const response = await fetch(`/api/post-recipe?id=${recipe.id}`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({recipe}),
      });
      const postedRecipe = await response.json();
      console.log(postedRecipe)
    } catch {
      console.error('error saving comment /comment');
    }
  }

  const saveContribution = async (userName, recipe) => {
    try {
      const response = await fetch(`/api/contributed-recipe`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userName, recipe }),
      });
      return response.json();
    } catch {
      console.error('error saving contribution /contributed-recipe');
    }
  }

  const generateRandomId = () => {
    const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
    const randomPart = Math.random().toString(16).substring(2); // Random number, removing '0.' at the beginning
    console.log(`${timestamp}-${randomPart}`)
    return `${timestamp}-${randomPart}`;
  }

  return (
    <>
      <Header />
      <div className="px-5 pb-5" id="form-holder">
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-2xl">Manual Recipe Upload</h2>
        </div>
        <form id="recipeForm" className="flex flex-col justify-center">
          <label htmlFor="recipe-pic-upload">Choose a picture to upload</label>
          <input
            className="resize-none border rounded-md p-2 w-full"
            type="file"
            id="recipe-pic-upload"
            name="recipe-pic-upload"
            accept="application/jpg"
          />
          <div className="d-flex flex-row align-items-center justify-content-center">
            <label htmlFor="recipe-title" className="px-2">
              Recipe title:
            </label>
            <input
              className="resize-none border rounded-md p-2 w-full"
              type="text"
              name="recipe-title"
              id="recipe-title"
              required
              onChange={(event) => setTitle(event.target.value)}
            />
            <label htmlFor="recipe-servings" className="px-2">
              Servings:
            </label>
            <input
              className="resize-none border rounded-md p-2 w-full"
              type="number"
              name="recipe-servings"
              id="recipe-servings"
              required
              onChange={(event) => setServings(event.target.value)}
            />
            <label htmlFor="recipe-time" className="px-2">
              Time to make:
            </label>
            <input
              className="resize-none border rounded-md p-2 w-full"
              type="number"
              name="recipe-time"
              id="recipe-time"
              required
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          <label htmlFor="description">Recipe description:</label>
          <textarea
            className="resize-none border rounded-md p-2 w-full"
            name="description"
            id="description"
            rows="3"
            cols="33"
            required
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            className="resize-none border rounded-md p-2 w-full"
            name="ingredients"
            id="ingredients"
            rows="5"
            cols="33"
            required
            placeholder="write ingredients here - press enter after each ingredient"
            onChange={(event) => setIngredients(event.target.value)}
          />
          <label htmlFor="instructions">Directions:</label>
          <textarea
            className="resize-none border rounded-md p-2 w-full"
            name="instructions"
            id="instructions"
            rows="5"
            cols="33"
            required
            placeholder="write recipe steps here - press enter after each step"
            onChange={(event) => setDirections(event.target.value)}
          />
          <button
            className="border hover:bg-gray-100 rounded p-2 my-4 w-[20%]"
            onClick={saveRecipe}
          >
            Upload
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
