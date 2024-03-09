import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";

// Import Sequelize and Models
import { sequelize } from "./util/database";
import { User } from "./models/user";
import { Post } from "./models/post";

// Define Relationships
User.hasMany(Post);
Post.belongsTo(User);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

// Database Sync and Server Start
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
    root.render(
      <React.StrictMode>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </React.StrictMode>
    );
  })
  .catch((err) => console.error("Error syncing database:", err));
