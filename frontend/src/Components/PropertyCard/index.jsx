import React from "react";
import "./PropertyCard.css";
import {Link} from "react-router-dom";


const PropertyCard = ({house}) => {

    return (
        <Link to={{pathname: `/buildingpage/${house.id}`, state:house.id}} className="central" id="cards-id">
            <img className="card-img" src={house.image}/>
            <span className="card-header">{house.name}</span>
            <span className="card-subheader">{house.location}</span>
        </Link>
    )   
}

export default PropertyCard;
