setInterval(() => {
  const heartContainer = document.getElementById("heart-holder");
  const newFavorite = document.createElement("p");
  newFavorite.textContent = `${localStorage.getItem(
    "userName"
  )} favorited a recipe!`;
  heartContainer.appendChild(newFavorite);
}, 10000);

