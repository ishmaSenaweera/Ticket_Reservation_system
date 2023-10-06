import React from "react";
import "./nav.css";
import train from "../images/train.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <img className="homeImage" src={train} alt="" />
      </div>
    </div>
  );
}

export default Home;
