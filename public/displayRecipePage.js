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
      const newIngredientsList = localRecipe.ingredients
        .map((item) => `<li>${item}</li>`)
        .join("");
      ingredients.innerHTML = newIngredientsList;
      const newDirectionsList = localRecipe.instructions
        .map((item) => `<li>${item}</li>`)
        .join("");
      directions.innerHTML = newDirectionsList;
    }
  });
};

const displayComments = () => {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("comments") !== null) {
      const commentArray = JSON.parse(localStorage.getItem("comments"));
      commentArray.forEach((item) => createCommentCard(item.name, item.comment));
    } 
  });
};

const createCommentCard = (name, comment) => {
    // create new card element with given name and comment, then append to comment container
    const newCard = document.createElement('div');
    newCard.id = 'commentCard';
    newCard.classList.add('row');
    
    const newImg = document.createElement('img');
    newImg.src = '/assets/cooker.svg';
    newImg.alt = 'cooker profile image';
    newImg.width = '50';
    newImg.classList.add('col-sm-1');
    newCard.appendChild(newImg);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('col-10');
    const nameElement = document.createElement('h4');
    nameElement.classList.add('fw-light')
    nameElement.textContent = name;
    const commentElement = document.createElement('p');
    commentElement.textContent = comment;
    contentWrapper.appendChild(nameElement);
    contentWrapper.appendChild(commentElement);

    newCard.appendChild(contentWrapper);
    
    const commentContainer = document.getElementById('comment-container');
    commentContainer.appendChild(newCard);
}

const handleTextArea = () => {
  const textbox = document.getElementById("add-comment");
  textbox.textContent = "";
};

const addNewComment = () => {
  const comment = document.getElementById("add-comment");
  if (localStorage.getItem("comments") !== null) {
    const localComments = JSON.parse(localStorage.getItem("comments"));
    localComments.push({
      name: localStorage.getItem("userName"),
      comment: comment.value,
    });
    localStorage.setItem("comments", JSON.stringify(localComments));
  } else {
    const newComment = [
      { name: localStorage.getItem("userName"), comment: comment.value },
    ];
    localStorage.setItem("comments", JSON.stringify(newComment));
  }
  const textbox = document.getElementById("add-comment");
  textbox.textContent = "";
  location.reload();
};

const favoriteRecipe = () => {
    if (localStorage.getItem('favorites') !== null) {
        // favorites will be an array of recipes
        const localFavorites = JSON.parse(localStorage.getItem('favorites'));
        localFavorites.push(JSON.parse(localStorage.getItem('recipe')));
        localStorage.setItem('favorites', JSON.stringify(localFavorites));
    } else {
        const localFavorite = [JSON.parse(localStorage.getItem('recipe'))];
        localStorage.setItem('favorites', JSON.stringify(localFavorite));
    }
    alert('this recipe was saved to your favorites.');
}

displayRecipePage();
displayComments();
