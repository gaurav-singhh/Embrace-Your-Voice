import React from "react";
import { Container, PostForm } from "../components";
import { useSelector } from "react-redux";

function AddPost() {
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  return (
    <div className={`py-8 ${isDarkTheme ? "bg-gray-900 " : "bg-gray-600"}`}>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
