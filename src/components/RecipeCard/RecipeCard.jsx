import '../../globalStyles.css'
import { NavLink } from 'react-router-dom'
import React from 'react';
import '../../globalStyles.css'
import Placeholder from '../../../assets/foodbaby.jpg'

export default function RecipeCard({ recipe }) {
    return (
        <div id="recipeCard" className="col">
          <NavLink to={`/recipe-page/${recipe.id}`} onClick={() => localStorage.setItem('id', recipe.id)}>
              <img
                src={Placeholder}
                alt="filler for image card"
                width="300"
              />
            <h1 id="recipe-title" className="font-semibold text-lg">{recipe.title}</h1>
            <p id="recipe-description">{recipe.description}</p>
          </NavLink>
        </div>
    )
}