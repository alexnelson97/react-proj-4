const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  addPost: async (req, res) => {
    console.log("addPost");
    res.sendStatus(200);
  },
  getAllPosts: async (req, res) => {
    console.log("getAllPosts");
    res.sendStatus(200);
  },
  getCurrentUserPosts: async (req, res) => {
    console.log("getCurrentUserPosts");
    res.sendStatus(200);
  },
  editPost: async (req, res) => {
    console.log("editPost");
    res.sendStatus(200);
  },
  deletePost: async (req, res) => {
    console.log("deletePost");
    res.sendStatus(200);
  },
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
