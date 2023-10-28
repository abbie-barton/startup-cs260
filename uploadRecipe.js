const saveRecipe = () => {
  // uses fake data and saves it to local storage - same format of data as will be in the database
  // and same json format as will be called from apis
  const recipePicture = document.getElementById("recipe-pic-upload");
  const servings = document.getElementById("recipe-servings");
  const time = document.getElementById("recipe-time");
  const title = document.getElementById("recipe-title");
  const ingredients = document.getElementById("ingredients");
  const instructions = document.getElementById("instructions");

  if (
    servings.value &&
    time.value &&
    title.value &&
    ingredients.value &&
    instructions.value
  ) {
    // parse ingredients into an array of strings
    const parsedIngredients = ingredients.value.split("\n");

    // parse instructions into an array of strings
    const parsedInstructions = instructions.value.split("\n");

    const newRecipe = {
      image: recipePicture,
      title: title,
      servings: servings,
      time: time,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
    };

    // for right now put it into local storage, later will post it into the database
    localStorage.setItem("recipe", JSON.stringify(newRecipe));

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
