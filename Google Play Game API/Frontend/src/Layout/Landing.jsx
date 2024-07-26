import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import DualShock from '../Assets/DualShock.png'
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Landing = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Have a center point to keep your<span style={{color: '#2fc078'}}> Games</span> 
          </h1>
          <p className="primary-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, quod, hic voluptatibus eligendi est asperiores nostrum 
          </p>
          <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={DualShock} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
