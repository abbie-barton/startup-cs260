const displayRecipePage = () => {
    // when the DOM is loaded, check if there is a recipe in localStorage. 
    // if there is, replace recipeCard content with localStorage.recipe content
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("recipe") !== null) {
      const localRecipe = JSON.parse(localStorage.getItem("recipe"));
      // images will not be changed for now since localStorage can only hold strings, not files
      const title = document.getElementById("title");
      const author = document.getElementById("author");
      const date = document.getElementById("date");
      const description = document.getElementById("description");
      const time = document.getElementById("time");
      const servings = document.getElementById("servings");
      // ul elements
      const ingredients = document.getElementById("ingredients");
      const directions = document.getElementById("directions");

      title.textContent = localRecipe.title;
      author.textContent = "author: " + localRecipe.author;
      date.textContent = "posted on: " + localRecipe.date;
      description.textContent = localRecipe.description;
      time.textContent = "cook time: " + localRecipe.time + " minutes";
      servings.textContent = "servings: " + localRecipe.servings;
      // map li elements within ul
      const newIngredientsList = localRecipe.ingredients.map(item => `<li>${item}</li>`).join('');
      ingredients.innerHTML = newIngredientsList;
      const newDirectionsList = localRecipe.instructions.map(item => `<li>${item}</li>`).join('');
      directions.innerHTML = newDirectionsList;
    }
  });
};

const displayComments = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('comments') !== null) {
            const commentContainer = document.getElementById('comment-container');

        }
    })
}

const addNewComment = () => {
    
}

displayRecipePage();
displayComments();