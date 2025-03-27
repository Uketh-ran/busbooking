import React from "react";
import "./Flag.css"; // Import CSS file
import { Container } from "react-bootstrap";

const countries = [
    { name: "Colombia", flag: "https://flagcdn.com/w80/co.png" },
    { name: "India", flag: "https://flagcdn.com/w80/in.png" },
    { name: "Indonesia", flag: "https://flagcdn.com/w80/id.png" },
    { name: "Malaysia", flag: "https://flagcdn.com/w80/my.png" },
    { name: "Peru", flag: "https://flagcdn.com/w80/pe.png" },
    { name: "Singapore", flag: "https://flagcdn.com/w80/sg.png" },
    { name: "Vietnam", flag: "https://flagcdn.com/w80/vn.png" },
    { name: "Cambodia", flag: "https://flagcdn.com/w80/kh.png" }
];

const Flag = () => {
    return (
        <Container >
            <div className="flag-container mt-5 pt-5">
                <h2 className=" text-start">Global Presence</h2>
                <div className="flag-list">
                    {countries.map((country, index) => (
                        <div key={index} className="flag-item">
                            <img src={country.flag} alt={country.name} className="flag-image" />
                            <p className="mt-3 countryname">{country.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Flag;
