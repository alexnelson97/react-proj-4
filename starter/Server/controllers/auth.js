require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    process.env.SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

module.exports = {
  createToken,
  login: async (req, res) => {
    let { username, password } = req.body;
    const token = createToken(username, password);
    res.status(200).send(token);
  },
  register: async (req, res) => {
    console.log("register");
    res.sendStatus(200);
  },
};
