import React from "react";
import { Link } from "react-router-dom";

import Container from "../components/core/Container";

function HomePage() {
  return (
    <Container>
      Homepage.
      <br />
      <Link to="/login">Login</Link>
    </Container>
  );
}

export default HomePage;
