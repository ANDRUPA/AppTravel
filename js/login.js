document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".formLogin")
    .addEventListener("submit", async (ev) => {
      ev.preventDefault();

      const email = document.querySelector("#email").value;
      const contrasena = document.querySelector("#contrasena").value;

      const body = JSON.stringify({
        email,
        password: contrasena,
      });

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      try {
        const loginResponse = await fetch("http://localhost:3000/login", {
          method: "POST",
          body,
          headers,
        });

        if (loginResponse.ok) {
          const loginJson = await loginResponse.json();
          localStorage.setItem("token", loginJson.token);
          window.location.href = "index.html";
        } else {
          alert("verifique usuario y password");
        }
      } catch (error) {
        alert("algo malo pasa en el back");
      }
    });
});
