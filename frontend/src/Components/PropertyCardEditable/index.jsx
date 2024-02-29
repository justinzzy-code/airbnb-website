import React, { useContext, useState, useEffect } from "react";
import "./PropertyCardEditable.css";
import {Link} from "react-router-dom";
import axios from "axios";
import { APIContext } from "../../Contexts";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../PropertyCard";

const PropertyEditable = ({house, toSet,setter}) => {
    const { link  } = useContext(APIContext)
    const token = localStorage.getItem('token') 
    const navigate = useNavigate();
    const [bool, setBool] = useState(false)
    const [deleteCount, setDeleteCount] = useState(0)

    const deleteProperty = () => {
      console.log("deleting now")
      fetch(link+"/property/delete_property/"+house.id+"/", {
        method: 'delete',
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        setter(toSet+1)
      })
    }

    useEffect(() => {
      if (bool) {
        deleteProperty()
      } else {
        setBool(true)
      }
    }, [deleteCount])

    const makeSure = () => {
      const result = window.confirm('Are you sure you want to delete this property?');
        if (result) {
          checkReservationRequests()
        } else {
          console.log('Action cancelled by user.');
        }
    }
    

    const checkReservationRequests = () => {
      fetch(link+"/property/view_reservation_requests/", {
        method: 'get',
          headers: {
            'Authorization': `Token ${token}`,
          },
      })
      .then((response) => {
          return response.json()
      })
      .then((data) => {
        const res_array = data.results
        if (!(typeof res_array === "undefined") && (res_array.length > 0)) {
          const arr = []
          for (let i = 0; i < res_array.length; i++) {
            if (res_array[i].property_id === house.id) {
              alert("There are existing reservation requests. Please resolve them first.")
            } else {
              arr.push(1)
            }
          }
          if (arr.length === res_array.length) {
            setDeleteCount(deleteCount+1)
          }
        } else {
          setDeleteCount(deleteCount+1)
        }
      })
    }

    return (
        <div className="central">
            <PropertyCard house={house}></PropertyCard>
            
            <Link to={{pathname: `/updateproperty/${house.id}` }} className="central" state={{house}}>
                <button className="edit-property-button">Edit</button>
            </Link>
            <button className = "del-property-button" onClick={() => makeSure()}>Delete</button>
            <Link  to={{pathname: `/addimage/${house.id}` }} className="central">
              <button className = "add-images-button" >Add More Img</button>
            </Link>
        </div>
    )   
}

export default PropertyEditable;
