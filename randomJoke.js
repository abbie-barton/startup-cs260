const getRandJoke = () => {
  fetch(`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((data) => {
      const parentAbout = document.getElementById("about");

      const jokeHeading = document.createElement('b');
      jokeHeading.textContent = "enjoy a joke"
      parentAbout.appendChild(jokeHeading);

      const jokeElement = document.createElement("p");
      jokeElement.textContent = data.value;
      parentAbout.appendChild(jokeElement);
    });
};

getRandJoke();
