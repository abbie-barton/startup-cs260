const displayAccountInfo = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const accountUser = document.getElementById("display-userName");
        accountUser.textContent = localStorage.getItem('userName');
    })
}

const logout = () => {
    localStorage.removeItem("userName");
    fetch(`/api/auth/logout`, {
      method: "delete",
    }).then(() => (window.location.href = "/"));
  }

displayAccountInfo();