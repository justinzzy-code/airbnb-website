import React, { useEffect, useState,useContext } from "react"
import { useSearchParams, Link } from "react-router-dom";
import ReservationCard from '../../Components/ReservationCard'
import './Host.css'
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../Contexts";

const Host = () => {
    const [filter_data, setUsers] = useState([])
    const token = localStorage.getItem('token') || '';
    const [searchParams, setSearchParams] = useSearchParams();
    const { link  } = useContext(APIContext)
    var pageNum = searchParams.get("p") || '1'
    var status = searchParams.get("status") || ''

    const updateRequest = (id, answer) => {
        fetch(link+'/property/update_reservation_requests/'+id+'/', {
            method: 'put',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ status: answer })
          })
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log(data)
            filter(null)
          })
    }

    const makeSure = (id, answer) => {
        const result = window.confirm('Are you sure you want to perform this action?');
        if (result) {
          updateRequest(id, answer)
        } else {
          console.log('Action cancelled by user.');
        }
      }

    const fetchFilterData = () => {
        fetch(link+'/property/view_reservation_requests/?status='+status+'&p='+pageNum, {
            method: 'get',
            headers: {
              'Authorization': `Token ${token}`,
            },
          })
          .then(response => {
            return response.json()
          })
          .then(reservations_data => {
            console.log(reservations_data)
            setUsers(reservations_data)
          })
    }

    useEffect(() => {
        fetchFilterData()
    }, [])

      var reservations_data = (filter_data.results ?? [])
      function filter(event) {
        if (event) {
          event.preventDefault();
        }
        var pageNum = document.querySelector('input[name="pageNum"]:checked') ? document.querySelector('input[name="pageNum"]:checked').value : '';
        var status = document.querySelector('input[name="status"]:checked') ? document.querySelector('input[name="status"]:checked').value : '';
        status = status || searchParams.get("status") || '';
        window.location.href = window.location.pathname+"?status="+status+'&p='+pageNum;
      }
      
      for (var i=1; i<5; i++) {
        for (var elem of document.getElementsByClassName(`p${i}`)) {
          if (i < Math.ceil(filter_data.count/3) + 1) {
            elem.style.display = "inline-block";
          } else {
            elem.style.display = "none";
          }
        }
      }
      return(
        <div>
          <div className="form">
        <form method="get" onSubmit={filter} className="my-filter-form">
            <div className="search">
              <label htmlFor="name">Name of property:</label>
              <input id="name" type="text"></input>
              <label htmlFor="location">Location</label>
              <input id="location" type="text"></input>
            </div>
            <div className="filter">
              <fieldset id="ordering">
                <input type="radio" id="xx" name="ordering" value="-number_of_beds" />
                <label htmlFor="xx">Number of beds decending</label>
                <input type="radio" id="xy" name="ordering" value="number_of_beds" />
                <label htmlFor="xy">Number of beds ascending</label>
                <input type="radio" id="yx" name="ordering" value="-number_of_guests" />
                <label htmlFor="yx">Number of guests decending</label>
                <input type="radio" id="yy" name="ordering" value="number_of_guests" />
                <label htmlFor="yy">Number of guests ascending</label>
              </fieldset>
            </div>
            <input className="filter-button" type="submit" value="Search" />
          </form>
        </div>
            <div className="cards">
                
                {reservations_data.map(function(d, idx){
                return (
                    <div className="card" key={"d"+idx}>
                      <ReservationCard property_id = {d.property_id} key={"r"+idx}></ReservationCard>
                      <span key={"s"+idx} className="card-subheader">Status: {d.status}</span>
                      <span className="buttons">
                        {(d.status==="PENDING") && <button onClick={() => {makeSure(d.id,"APPROVED")}} key={"b"+idx} className="update-button" >Accept</button>}
                        {(d.status==="PENDING") && <button onClick={() => {makeSure(d.id,"DENIED")}} key={"b"+idx} className="update-button" >Reject</button>}
                        {(d.status==="APPROVED") && <button onClick={() => {makeSure(d.id,"TERMINATED")}} key={"b"+idx} className="update-button" >Terminate</button>}
                      </span>
                      
                    </div>
                )
                })}  
                
            </div>
            
          {/* Pagination */}
          <div className="pagination">
            <fieldset id="pageNum">
              Pages
              <br/>
              <input type="radio" id="p1" name="pageNum" value="1" onClick={filter}/>
              <label htmlFor="p1" className="p1">1</label>
              <input type="radio" id="p2" name="pageNum" value="2" onClick={filter}/>
              <label htmlFor="p2" className="p2">2</label>
              <input type="radio" id="p3" name="pageNum" value="3" onClick={filter}/>
              <label htmlFor="p3" className="p3">3</label>
              <input type="radio" id="p4" name="pageNum" value="4" onClick={filter}/>
              <label htmlFor="p4" className="p4">4</label>
            </fieldset>

          </div>
        </div>
    )


}

export default Host;