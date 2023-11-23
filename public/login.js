const login = () => {
  const nameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");
  if (nameElement.value && passwordElement.value) {
    loginUser();
  }
};

const signup = () => {
  const nameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");
  if (nameElement.value && passwordElement.value) {
    createUser();
  }
}

(async () => {
  const userName = localStorage.getItem("userName");
  if (userName) {
    window.location.href = "home.html";
  }
})();

const loginUser = async () => {
  loginOrCreate(`/api/auth/login`);
}

const createUser = async () => {
  loginOrCreate(`/api/auth/create`);
}

const loginOrCreate = async (endpoint) => {
  const userName = document.getElementById("username")?.value;
  const password = document.getElementById("password")?.value;
  const response = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify({ userName: userName, password: password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(response);

  if (response.ok) {
    localStorage.setItem("userName", userName);
    window.location.href = "home.html";
  } else {
    const body = await response.json();
    alert(`⚠ Error: ${body.msg}`)
  }
}

const getUser = async (userName) => {
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${userName}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}
