const displayAccountInfo = async () => {
  const accountUser = document.getElementById("display-userName");
  if (accountUser) {
    accountUser.textContent = localStorage.getItem("userName");
  }
  const user = await getUser(localStorage.getItem("userName"));
  console.log(user.user.favoritedRecipes);
  if (user.user.contributedRecipes.length > 0) {
    displayRecipe(user.user.contributedRecipes, "contributed-recipes");
  }
  if (user.user.favoritedRecipes.length > 0) {
    displayRecipe(user.user.favoritedRecipes, "favorited-recipes");
  }
};

const logout = () => {
  localStorage.removeItem("userName");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
};

const displayRecipe = (recipes, holderId) => {
  const recipeContainer = document.getElementById(holderId);
  if (recipes && Array.isArray(recipes)) {
    const recipeHTMLArray = recipes.map(
        (recipe) => `
            <div id="recipeCard" class="col">
              <a onclick="handleRecipeClick('${recipe.id}')">
                <!-- filler image -->
                  <img
                    src="/assets/foodbaby.jpg"
                    alt="filler for image card"
                    width="300"
                  />
                <h4 class="recipe-title">${recipe.title}</h4>
                <p class="recipe-description">${recipe.description}</p>
              </a>
            </div>
        `
      );
      recipeContainer.innerHTML = recipeHTMLArray.join("");
  } else {
    console.error('recipes is not an array');
  }
};

const handleRecipeClick = (id) => {
  console.log(id);
  localStorage.setItem("id", id);
  window.location.href = `/recipePage.html`;
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

// getUser(localStorage.getItem('userName'));
displayAccountInfo();
