const register = document.getElementById("register-form");
const login = document.getElementById("login-form");
const linkToRegister = document.getElementById("register-link");
const linkToLogin = document.getElementById("login-link");
const formTitle = document.getElementById("form-title");
const loginTitle = document.getElementById("login-title");
const registerTitle = document.getElementById("register-title");

linkToLogin.addEventListener("click", () => {
  register.style.display = "none";
  login.style.display = "flex";
  formTitle.innerText = "Login";
});

linkToRegister.addEventListener("click", () => {
  login.style.display = "none";
  register.style.display = "flex";
  formTitle.innerText = "Sign Up";
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

  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Registration successful! Please log in.");
        register.reset(); // Clear the registration form after submission
        linkToLogin.click(); // Redirect to login form after successful registration
      } else {
        alert("Registration failed: " + data.message);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

//login form submission
login.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      window.location.href = 'dashboard.html';     
    }
  } catch (error) {
    console.log(error);
  }
});
