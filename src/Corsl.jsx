import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "react-bootstrap";
import "./Corsl.css";
import { useNavigate } from "react-router-dom";

// Import images
import offer1 from "./offer1.png";
import offer2 from "./offer2.png"
import offer3 from "./offer-3.png"
import offer4 from "./offer4.png"
import offer5 from "./offer5.png"
import offer6 from "./offer6.png"

const carouselItems = [
    {
        id: 1,
        title: "Save up to Rs 250 on bus tickets",
        offer: "FIRST",
        valid: "Valid till 31 Mar",
        image: offer1,
        bg: `linear-gradient(71.04deg, rgb(12, 57, 139) -6.92%, rgb(62, 118, 216) 109.43%)`,
    },
    {
        id: 2,
        title: "Save up to Rs 300 on Chartered Bus",
        offer: "CHARTERED15",
        valid: "Valid till 19 Mar",
        image: offer2,
        bg: "linear-gradient(71.04deg, rgb(39, 57, 101) -6.92%, rgb(80, 210, 149) 109.43%)",
    },
    {
        id: 3,
        title: "Save up to Rs. 300 in AP, Telangana routes",
        offer: "SUPERHIT",
        valid: "Valid till 31 Mar",
        image: offer3,
        bg: "linear-gradient(71.04deg, rgb(72, 0, 4) -6.92%, rgb(216, 78, 85) 109.43%)",
    },
    {
        id: 4,
        title: "Save 25% up to Rs 100 on SBSTC bus",
        offer: "SBNEW",
        valid: "Valid till 31 Mar",
        image: offer4,
        bg: "linear-gradient(71.04deg, rgb(14, 113, 67) -6.92%, rgb(115, 236, 179) 109.43%)",
    },
    {
        id: 5,
        title: "Save up to Rs. 50 on IntrCity SmartBus",
        offer: "INTRCITY",
        valid: "Valid till 31 Mar",
        image: offer5,
        bg: "linear-gradient(71.04deg, rgb(24, 125, 151) -6.92%, rgb(109, 213, 237) 109.43%)",
    },
    {
        id: 6,
        title: "Save up to Rs 50 on bus tickets",
        offer: "YOLORED",
        valid: "Valid till 31 Mar",
        image: offer6,
        bg: "linear-gradient(71.04deg, rgb(206, 119, 0) -6.92%, rgb(255, 194, 111) 109.43%)",
    }
];


const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return <Button className="carousel-btn left" onClick={onClick}> <span className="buttonbg">&#10094; </span></Button>;
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return <Button className="carousel-btn right" onClick={onClick}> <span className="buttonbg">&#10095;</span></Button>;
};



const Corsl = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 3,  // Show 3 full slides + part of next
        slidesToScroll: 3,   // Scroll one slide at a time
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } }, // 2 full + part of next
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } }, // 2 full + part of next
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },  // 1 full + part of next
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },  // 1 full + small part
        ],
    };
    const navigate = useNavigate();

    return (
        <div className="carousel-container">
            <div className="carousel-header pt-3">
                <h2>TRENDING OFFERS</h2>
                <Button className="view-all " onClick={() => navigate("/view-offer")}>View All</Button>
            </div>
            <Slider {...settings}>
                {carouselItems.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item"

                    >
                        <div className="carousel-content " style={{
                            background: item.bg,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "10px"
                        }}>
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
