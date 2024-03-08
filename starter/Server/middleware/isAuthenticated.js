// importing required modules
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

// exporting middleware function for authentication
module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");

    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    try {
      // verify the extracted token using the secret key
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    // If no token is present or it is invalid, return an unauthorized error
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    // If token is valid, continue to the next middleware or route handler
    next();
  },
};
