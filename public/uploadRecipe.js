const saveRecipe = () => {
  // uses fake data and saves it to local storage - same format of data as will be in the database
  // and same json format as will be called from apis
  const recipePicture = document.getElementById("recipe-pic-upload");
  const servings = document.getElementById("recipe-servings");
  const time = document.getElementById("recipe-time");
  const title = document.getElementById("recipe-title");
  const description = document.getElementById("description");
  const ingredients = document.getElementById("ingredients");
  const instructions = document.getElementById("instructions");

  if (
    servings.value &&
    time.value &&
    title.value &&
    description.value &&
    ingredients.value &&
    instructions.value
  ) {
    // parse ingredients & instructions into an array of strings
    const parsedIngredients = ingredients.value.split("\n");
    const parsedInstructions = instructions.value.split("\n");

    const date = new Date();
    const dateString = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();

    const newRecipe = {
      // since localStorage can only hold strings, image for now will only hold file path and will not be displayed
      id: 1,
      image: recipePicture.value,
      title: title.value,
      servings: servings.value,
      time: time.value,
      description: description.value,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      author: localStorage.getItem("userName"),
      date: dateString,
      createdBy: date,
    };

    // for right now put it into local storage, later will post it into the database
    localStorage.setItem("recipe", JSON.stringify(newRecipe));

    postRecipe(newRecipe);

    // give user confirmation - your recipe was uplaoded!
    alert("Your recipe was uploaded successfully.")
  } else {
    alert("please fill in all fields");
  }
};

const handleTextBox = (isIngredientsBox) => {
  if (isIngredientsBox) {
    const textbox = document.getElementById("ingredients");
    textbox.textContent = "";
  } else {
    const textbox = document.getElementById("instructions");
    textbox.textContent = "";
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
