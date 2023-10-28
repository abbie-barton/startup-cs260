const displayRecipe = () => {
    // when the DOM is loaded, check if there is a recipe in localStorage. 
    // if there is, replace recipeCard content with localStorage.recipe content
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("recipe") !== null) {
      const localRecipe = JSON.parse(localStorage.getItem("recipe"));
      // images will not be changed for now since localStorage can only hold strings, not files
      const recipeTitleElements = document.querySelectorAll(".recipe-title");
      recipeTitleElements.forEach((element) => {
        element.textContent = localRecipe.title;
      });
      const recipeDescriptionElements = document.querySelectorAll(
        ".recipe-description"
      );
      recipeDescriptionElements.forEach((element) => {
        element.textContent = localRecipe.description;
      });
    }
  });
};

const saveSortOptions = () => {
    const select = document.getElementById("search-select");
    const searchbar = document.getElementById("searchbox");

    localStorage.setItem('select-term', select.value);
    localStorage.setItem('search-term', searchbar.value);
}

displayRecipe();
