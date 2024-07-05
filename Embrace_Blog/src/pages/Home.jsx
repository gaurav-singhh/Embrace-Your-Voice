import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import InitialPage from "../components/InitialPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  return (
    <Container>
      <InitialPage />
    </Container>
  );
}

export default Home;
