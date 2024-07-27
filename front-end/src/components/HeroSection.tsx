import React from "react";
import heroSectionImage from "../assets/images/cyber-bg.png";

const HeroSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="container-fluid bg-light vh-100 d-flex align-items-center pt-5 mt-5">
      <div className="row absolute">
        <div className="col-md-6 relative">
          <h1 className="display-4">{title}</h1>
          <p className="lead">{description}</p>
          <a href="/content" className="btn btn-primary">
            Get Started
          </a>
        </div>
        <div className="col-md-6">
          <img
            src={heroSectionImage}
            alt="placeholder"
            className="img-fluid float-right relative"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
