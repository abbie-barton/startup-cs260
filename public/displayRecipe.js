const displayRecipe = (recipes) => {
    const recipeContainer = document.getElementById("recent-recipes");
    console.log('done');
    const recipeHTMLArray = recipes.map(
      (recipe) => `
        <div id="recipeCard" class="col">
          <a href="recipePage.html">
            <!-- filler image -->
              <img
                src="/assets/foodbaby.jpg"
                alt="filler for image card"
                width="300"
              />
            <h4 class="recipe-title">${recipe.recipe.title}</h4>
            <p class="recipe-description">${recipe.recipe.description}</p>
          </a>
        </div>
    `);
    recipeContainer.innerHTML = recipeHTMLArray.join("");
};

const saveSortOptions = () => {
  const select = document.getElementById("search-select");
  const searchbar = document.getElementById("searchbox");

  localStorage.setItem("select-term", select.value);
  localStorage.setItem("search-term", searchbar.value);
};

const getRecentRecipes = async () => {
  try {
    const response = await fetch("/api/recent-recipes");
    const data = await response.json();
    console.log(data);
    displayRecipe(data);
  } catch {
    console.error("failed to fetch /recent-recipes");
  }
};

getRecentRecipes();
