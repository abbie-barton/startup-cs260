import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CommentCard from "../../components/CommentCard/CommentCard";
import Favorite from "../../components/Favorite/Favorite";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  const [recipe, setRecipe] = useState({});
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const recipeId = useParams().id;

  const favorite = new Favorite();

  const getRecipe = async (id) => {
    try {
      const response = await fetch(`/api/recipe?id=${id}`);
      const data = await response.json();

      localStorage.setItem("recipe", JSON.stringify(data));
      setRecipe(data.recipe);
      setIngredients(data.recipe.ingredients);
      setInstructions(data.recipe.instructions);
      setComments(data.recipe.comments);
    } catch {
      console.error("failed to fetch /recipe");
    }
  };

  const saveComment = async () => {
    const name = localStorage.getItem('userName');
    const commentText = newComment;
    try {
      const response = await fetch(`/api/comment?id=${recipeId}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, commentText }),
      });
      const data = response.json();
      console.log(data);
      location.reload();
    } catch {
      console.error("error saving comment");
    }
  };

  const handleFavoriteClick = () => {
    favorite.favorite();
  }

  useEffect(() => {
    getRecipe(recipeId);
  }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col mx-12">
        <div className="flex flex-col items-start justify-center">
          <div className="d-flex flex-row justify-between">
            <h1 id="title" className="font-semibold text-4xl">
              {recipe.title}
            </h1>
            <div id="favorite-icon" className="px-2">
              <img
                src="/assets/heart-circle.svg"
                alt="favorite recipe icon"
                width="50"
                onClick={handleFavoriteClick}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <p id="author" className="pr-5 font-normal text-xl">
              author: {recipe.author}
            </p>
            <p id="date" className="px-5 font-normal text-xl">
              date: {recipe.date}
            </p>
          </div>
          <p id="description">{recipe.description}</p>
          <div className="d-flex flex-row justify-content-center align-items-center py-4">
            <img
              src="/assets/foodbaby.jpg"
              alt="recipe picture"
              className="w-25 px-2"
            />
            <img
              src="/assets/baking-kid.jpg"
              alt="recipe picture"
              className="w-25 px-2"
            />
          </div>
          <div className="d-flex flex-row">
            <h3 id="time" className="pr-5 font-normal text-xl">
              cook time: {recipe.time}
            </h3>
            <h3 id="servings" className="px-5 font-normal text-xl pb-2">
              servings: {recipe.servings}
            </h3>
          </div>
          <h3 className="mx-3 text-xl">ingredients:</h3>
          <ul className="mx-5 pb-4">
            {ingredients.map((ingredient) => {
              return (
                <li key={ingredient} className="pl-2">
                  - {ingredient}
                </li>
              );
            })}
          </ul>
          <h3 className="mx-3 text-xl">directions</h3>
          <ul className="mx-5 pb-4">
            {instructions.map((direction) => {
              return (
                <li key={direction} className="pl-2">
                  - {direction}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <h4 className="px-5 py-2 font-normal text-xl">Comments</h4>
      <div className="container text-start pb-4" id="comment-container">
        {comments.map((comment) => {
          return <CommentCard key={comment} comment={comment} />;
        })}
      </div>
      <div className="px-lg-5 pb-4 d-flex flex-column">
        <label htmlFor="add-comment" className="text-normal font-lg">
          add comment:
        </label>
        <textarea
          className="resize-none border rounded-md p-2 w-full"
          name="add-comment"
          id="add-comment"
          rows="2"
          cols="33"
          required
          placeholder="write your comment here"
          onChange={(event) => {setNewComment(event.target.value)}}
        />
        <button
          className="border hover:bg-gray-100 rounded p-2 my-4 w-[20%]"
          //add new comment
          onClick={saveComment}
        >
          publish comment
        </button>
      </div>
    
      <Footer />
    </>
  );
}
