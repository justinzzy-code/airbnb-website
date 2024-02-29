import React from "react";
import "./AddResvPropertyCard.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../PropertyCard";

const AllResvPropertyCard = ({house}) => {
    const server_url = "http://127.0.0.1:8000";
    const token = localStorage.getItem('token') || '';
    const navigate = useNavigate();
    
    function myFunction(id){
        navigate("/createreservation/"+id)
    }

    return (
        <div className="card">
            <PropertyCard house={house}></PropertyCard>
            <button className="reservation-button" onClick={() => myFunction(house.id)}>Make Reservation</button>
        </div>
        
    )   
}

export default AllResvPropertyCard;
