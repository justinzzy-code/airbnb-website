import "./ReservationCard.css";
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react"

const PropertyCard = ({property_id}) => {
    const id = property_id
    const [users, setUsers] = useState([])
  
    const fetchUserData = () => {
    fetch( "http://127.0.0.1:8000/property/get_property/"+id )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  var data = (users ?? [])

    return (
        <Link to={{pathname: `/buildingpage/${data.id}`, state:data.id}} class="central" id="cards-id">
            <img class="card-img" src={data.image}/>
            <span class="card-header">{data.name}</span>
            <span class="card-subheader">{data.location}</span>
        </Link>
    )   
}

export default PropertyCard;
