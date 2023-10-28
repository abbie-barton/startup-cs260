const login = () => {
  const nameElement = document.querySelector("#username");
  const passwordElement = document.querySelector("#password");
  const modal = document.querySelector("#modal");
  const accountText = document.getElementById("user");
  console.log("name: ", nameElement.value, " password: ", passwordElement.value)
  if (nameElement.value && passwordElement.value) {
    localStorage.setItem("userName", nameElement.value);
    localStorage.setItem("password", passwordElement.value);
    // make the modal go away, show 'my account' once logged in
    modal.style.display = "none";
    // accountText.innerHTML = "my account";
  } 
};

const showModal = () => {
  const modal = document.querySelector("#modal");
  const openModal = document.querySelector("#user");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  if (localStorage.getItem("userName") === null) {
    modal.style.display = "block";
  } else {
    window.location.href =
      "https://startup.makeitgood.click/pages/account.html";
  }
};
