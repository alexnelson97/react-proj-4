require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../util/database");
const { User } = require("../models/user");

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
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          let token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          const data = {
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token: token,
            exp: exp,
          };
          res.status(200).send(data);
        } else {
          res.status(400).send("Password is incorrect");
        }
      } else {
        res.status(400).send("User does not exist.");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },
  register: async (req, res) => {
    console.log("register");

    try {
      const { username, password } = req.body;
      const newUser = await User.create({ username, hashedPass: password });
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
