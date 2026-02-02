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

register.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;


    // Add your registration logic here
    const userData = {
        username,
        email,
        password
    };

    console.log("registered user: ", userData);
    
    localStorage.setItem("user", JSON.stringify(userData));
    
});




