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
      id: generateRandomId(),
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
      comments: [],
    };

    postRecipe(newRecipe);
    saveContribution(newRecipe.author, newRecipe);

    // give user confirmation - your recipe was uploaded!
    alert("Your recipe was uploaded successfully.")
    location.reload();
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

const generateRandomId = () => {
  const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
  const randomPart = Math.random().toString(16).substring(2); // Random number, removing '0.' at the beginning
  console.log(`${timestamp}-${randomPart}`)
  return `${timestamp}-${randomPart}`;
}

const saveContribution = async (userName, recipe) => {
  try {
    const response = await fetch(`/api/contributed-recipe`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, recipe }),
    });
    return response.json();
  } catch {
    console.error('error saving contribution /contributed-recipe');
  }
}