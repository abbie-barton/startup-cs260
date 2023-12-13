import React, { Component } from 'react';

class Favorite extends Component {
  socket;

  constructor() {
    super();
    this.configureWebSocket();
  }

  async favorite() {
    const user = localStorage.getItem('userName');
    const recipe = JSON.parse(localStorage.getItem('recipe'));
    await this.saveFavorite(user, recipe.recipe);
    alert('Recipe favorited successfully');
    this.broadcastEvent(user, recipe.recipe.title);
  }

  async saveFavorite(userName, recipe) {
    try {
      const response = await fetch(`/api/favorited-recipe`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userName, recipe }),
      });
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error saving favorite recipe /favorited-recipe', error);
    }
  }

  // Functionality for peer communication using WebSocket
  configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      console.log('WebSocket connected');
    };
    this.socket.onclose = (event) => {
      console.log('WebSocket closed');
    };
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const msg = JSON.parse(text);
      this.displayMsg(msg);
    };
  }

  displayMsg(msg) {
    const heartContainer = document.getElementById('heart-holder');
    const lastChild = heartContainer.lastElementChild;
    console.log(lastChild.textContent);
    console.log(`<p>${msg.user} favorited ${msg.recipeName}</p>`)
    if (lastChild.textContent == `${msg.user} favorited ${msg.recipeName}`) {
        return;
    } else {
        const newFavorite = document.createElement('p');
        newFavorite.textContent = `${msg.user} favorited ${msg.recipeName}`;
        heartContainer.appendChild(newFavorite);
    }
  }

  broadcastEvent(user, recipeName) {
    const event = {
      user: user,
      recipeName: recipeName,
    };
    this.socket.send(JSON.stringify(event));
  }

  render() {
    // You can render any UI elements associated with this component here
    return null
  }
}

export default Favorite;