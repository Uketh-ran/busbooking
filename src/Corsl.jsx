
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "react-bootstrap";
import "./Corsl.css";
import { useNavigate } from "react-router-dom";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Button className="carousel-btn left" onClick={onClick}>
      <span className="buttonbg leftbg">&#10094;</span>
    </Button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <Button className="carousel-btn right" onClick={onClick}>
      <span className="buttonbg rightbg">&#10095;</span>
    </Button>
  );
};

const Corsl = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/offers");
      setOffers(res.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 3.3,
    slidesToScroll: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header pt-3">
        <h2>TRENDING OFFERS</h2>
        <Button className="view-all" onClick={() => navigate("/view-offer")}>
          View All
        </Button>
      </div>
      <Slider {...settings}>
        {offers.map((item) => (
          <div key={item._id} className="carousel-item">
            <div
              className="carousel-content"
              style={{
                background: item.bg,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
              }}
            >
              <img src={item.image} alt={item.title} className="carousel-img" />
              <div>
                <p className="offer-title text-light">{item.title}</p>
                <p className="offer-valid">{item.valid}</p>
                <button className="offer-code1">{item.offer}</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Corsl;
