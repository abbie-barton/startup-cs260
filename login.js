const login = () => {

  const nameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");

  if (nameElement.value && passwordElement.value) {
    localStorage.setItem("userName", nameElement.value);
    localStorage.setItem("password", passwordElement.value);

    window.location.href = "home.html";
  } 
};
