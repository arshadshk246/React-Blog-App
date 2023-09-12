import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./components/Posts.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./components/Post.jsx";
import EditPost from "./components/EditPost.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/post" element={<Post />} />
        <Route path="/edit" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
