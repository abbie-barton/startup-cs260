setInterval(() => {
    const heartContainer = document.getElementById('heart-holder');
    const newFavorite = document.createElement('p');
    newFavorite.textContent = `${localStorage.getItem('userName')} favorited a recipe!`;
    heartContainer.appendChild(newFavorite);
}, 10000);


class Socket {
    socket;
  
    constructor() {
      const playerNameEl = document.querySelector('.player-name');
      playerNameEl.textContent = this.getPlayerName();
  
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
        this.broadcastEvent(this.getPlayerName(), GameStartEvent, {});
      }
    
      getPlayerName() {
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

const socket = new Socket()
