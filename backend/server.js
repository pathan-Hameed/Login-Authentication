import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// port no.
const PORT = 3000;

// dummy DB
const userDB = [];

// registering of new user
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  // basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "enter all credentials" });
  }

  //checking if user already exists
  const user = userDB.find((user) => user.email === email);
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    createdAt: new Date(),
  };

  userDB.push(newUser);

  return res.status(201).json({ message: "registration successfull", newUser });
});

// login of user
app.post("/api/user", (req, res) => {
  const { email, password } = req.body;
  try {
    const user = userDB.find(
  (user) => user.email === email && user.password === password
);
    if (user) {
      return res.status(201).json({ message: "login successfull", user });
    } else {
        return res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "login failed", error: error });
  }
});

app.get("/api/allUsers", (req, res) => {
  res.status(200).json({ users: userDB });
});

app.listen(PORT, () =>
  console.log(`the port is listening on localhost:${PORT}`),
);
