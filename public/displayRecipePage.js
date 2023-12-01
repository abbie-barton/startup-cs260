const displayRecipePage = (recipe) => {
  // images will not be changed for now since I can't figure out how to do files in mongodb
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const date = document.getElementById("date");
  const description = document.getElementById("description");
  const time = document.getElementById("time");
  const servings = document.getElementById("servings");
  // ul elements
  const ingredients = document.getElementById("ingredients");
  const directions = document.getElementById("directions");

  title.textContent = recipe.title;
  author.textContent = "author: " + recipe.author;
  date.textContent = "posted on: " + recipe.date;
  description.textContent = recipe.description;
  time.textContent = "cook time: " + recipe.time + " minutes";
  servings.textContent = "servings: " + recipe.servings;
  // map li elements within ul
  const newIngredientsList = recipe.ingredients
    .map((item) => `<li>${item}</li>`)
    .join("");
  ingredients.innerHTML = newIngredientsList;
  const newDirectionsList = recipe.instructions
    .map((item) => `<li>${item}</li>`)
    .join("");
  directions.innerHTML = newDirectionsList;
};

const displayComments = (comments) => {
  document.addEventListener("DOMContentLoaded", () => {
    comments.forEach((item) => createCommentCard(item.name, item.commentText));
  });
  comments.forEach((item) => {
    createCommentCard(item.name, item.commentText);
  });
};

const createCommentCard = (name, comment) => {
  // create new card element with given name and comment, then append to comment container
  const newCard = document.createElement("div");
  newCard.id = "commentCard";
  newCard.classList.add("row");

  const newImg = document.createElement("img");
  newImg.src = "/assets/cooker.svg";
  newImg.alt = "cooker profile image";
  newImg.width = "50";
  newImg.classList.add("col-sm-1");
  newCard.appendChild(newImg);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("col-10");
  const nameElement = document.createElement("h4");
  nameElement.classList.add("fw-light");
  nameElement.textContent = name;
  const commentElement = document.createElement("p");
  commentElement.textContent = comment;
  contentWrapper.appendChild(nameElement);
  contentWrapper.appendChild(commentElement);

  newCard.appendChild(contentWrapper);

  const commentContainer = document.getElementById("comment-container");
  commentContainer.appendChild(newCard);
};

const handleTextArea = () => {
  const textbox = document.getElementById("add-comment");
  textbox.textContent = "";
};

const addNewComment = () => {
  const comment = document.getElementById("add-comment");
  saveComment(localStorage.getItem("userName"), comment.value, localStorage.getItem("id"));

  const textbox = document.getElementById("add-comment");
  textbox.textContent = "";
  location.reload();
};

const saveComment = async (name, commentText, id) => {
  try {
    const response = await fetch(`/api/comment?id=${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, commentText }),
    });
    const comment = await response.json();
    console.log(comment);
  } catch {
    console.error("error saving comment /comment");
  }
};

const getRecipe = async (id) => {
  let recipe;
  try {
    const response = await fetch(`/api/recipe?id=${id}`);
    const data = await response.json();

    localStorage.setItem("recipe", JSON.stringify(data));
    recipe = data;
  } catch {
    console.error("failed to fetch /recipe");
  }

  displayComments(recipe.recipe.comments)
  displayRecipePage(recipe.recipe);
};

const getUser = async (userName) => {
  const response = await fetch(`/api/user/${userName}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

// id stored in local storage for current recipe page
getRecipe(localStorage.getItem("id"));

// favorite recipe javascript & websocket broadcast
// javascript
const favoriteRecipe = async () => {
  const user = await getUser(localStorage.getItem("userName"));
  const recipe = JSON.parse(localStorage.getItem('recipe'));
  saveFavorite(user.userName, recipe.recipe);
  alert('recipe favorited successfully');
};

const saveFavorite = async (userName, recipe) => {
  try {
    const response = await fetch(`/api/favorited-recipe`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, recipe }),
    });
    const user = await response.json();
    return user;
  } catch {
    console.error('error saving favorite recipe /favorited-recipe');
  }
}

//websocket
class Game {
  socket;

  constructor() {
    this.configureWebSocket();
  }

  async reset() {
    this.allowPlayer = false;
    this.playerPlaybackPos = 0;
    this.sequence = [];
    this.updateScore('--');
    await this.buttonDance(1);
    this.addButton();
    await this.playSequence();
    this.allowPlayer = true;

    // Let other players know a new game has started
    this.broadcastEvent(this.getUserName(), GameStartEvent, {});
  }

  getUserName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
  }

  async saveScore(score) {
    const userName = this.getPlayerName();
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      // Let other players know the game has concluded
      this.broadcastEvent(userName, GameEndEvent, newScore);

      // Store what the service gave us as the high scores
      const scores = await response.json();
      localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
      // If there was an error then just track scores locally
      this.updateScoresLocal(newScore);
    }
  }

  // Functionality for peer communication using WebSocket

  configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        this.displayMsg('player', msg.from, `started a new game`);
      }
    };
  }

  displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }
}

const game = new Game();

