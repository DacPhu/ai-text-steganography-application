import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExampleCarouselImage from "../assets/images/cyber-bg.png";
import WelcomeBackground from "../assets/images/welcome-background.jpg";
import { SetStateAction, useState } from "react";

const MyCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="col-md-10 bg-dark container-fluid d-flex align-items-center pt-5 mt-5 rounded"
    > 
      <Carousel.Item>
        <img
          className="d-block w-50 m-auto"
          src={WelcomeBackground}
          alt="Welcome Background"
        />
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center">
          <h5>Welcome to the website</h5>
          <p>Hope you enjoy our application!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row absolute">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-4 text-white">Encrypt</h1>
            <p className="lead text-white">Hide message into text</p>
            <Link to="/encrypt" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <div className="col-md-6">
            <img
              src={ExampleCarouselImage}
              alt="placeholder"
              className="img-fluid float-right relative"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="row absolute">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-4 text-white">Decrypt</h1>
            <p className="lead text-white">Find Message in text</p>
            <Link to="/decrypt" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <div className="col-md-6">
            <img
              src={ExampleCarouselImage}
              alt="placeholder"
              className="img-fluid float-right relative"
            />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
