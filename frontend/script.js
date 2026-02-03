const register = document.getElementById("register-form");
const login = document.getElementById("login-form");
const linkToRegister = document.getElementById("register-link");
const linkToLogin = document.getElementById("login-link");
const formTitle = document.getElementById("form-title");

linkToLogin.addEventListener("click", () => {
  register.style.display = "none";
  login.style.display = "flex";
  formTitle.textContent = "Login";
});

linkToRegister.addEventListener("click", () => {
  login.style.display = "none";
  register.style.display = "flex";
  formTitle.textContent = "Sign Up";
});

// registration form submission
register.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // Add your registration logic here
  const userData = {
    username,
    email,
    password,
  };

  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  localStorage.setItem("user", JSON.stringify(userData));
});

//login form submission
login.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data.message, data));
});
