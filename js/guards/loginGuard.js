document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token") == null) {
    location.href = "login.html";
  }
});
