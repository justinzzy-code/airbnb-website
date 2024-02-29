import React, { useEffect, useState,useContext } from "react"
import { useSearchParams } from "react-router-dom";
import ReservationCard from '../../Components/ReservationCard'
import './Reservations.css'
import { APIContext } from "../../Contexts";

const MyReservations = () => {

    const [filter_data, setUsers] = useState([])
    const token = localStorage.getItem('token') || '';
    const { link  } = useContext(APIContext)
    const [searchParams, setSearchParams] = useSearchParams();
    var pageNum = searchParams.get("p") || '1'
    var status = searchParams.get("status") || ''
    ///property/user_reservations/?start_date=&end_date=&property_id=1&status=PENDING

    const fetchFilterData = () => {
      fetch(link+'/property/user_reservations/?status='+status+'&p='+pageNum, {
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

    const makeSure = (id, answer) => {
      const result = window.confirm('Are you sure you want to perform this action?');
      if (result) {
        updateRequest(id, answer)
      } else {
        console.log('Action cancelled by user.');
      }
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

    return(
        <div>
          <div class="filter-status">
            <form method="get" onSubmit={filter}>
              <fieldset id="status">
                <input type="radio" id="xx" name="status" value="PENDING" />
                <label for="xx">
                  Pending
                </label>
                <input type="radio" id="xy" name="status" value="DENIED" />
                <label for="xy">
                  Denied
                </label>
                <input type="radio" id="xz" name="status" value="APPROVED" />
                <label for="xz">
                  Approved
                </label>
                <input type="radio" id="yx" name="status" value="CANCELLED" />
                <label for="yx">
                  Cancelled
                </label>
                <input type="radio" id="yy" name="status" value="TERMINATED" />
                <label for="yy">
                  Terminated
                </label>
                <input type="radio" id="yz" name="status" value="COMPLETED" />
                <label for="yz">
                  Completed
                </label>
                <label id="inputsunmitid" >
                <input type="submit"/>
                </label>
              </fieldset>

            </form>
          </div>
            <div className="cards">
                
                {reservations_data.map(function(d, idx){
                return (
                    <div className="card" key={"d"+idx}>
                      <ReservationCard property_id = {d.property_id} key={"r"+idx}></ReservationCard>
                      <span key={"s"+idx} className="card-subheader">Status: {d.status}</span>
                      {!(d.status === "DENIED" || d.status === "CANCELLED" || d.status === "TERMINATED") && <button key={"b"+idx} className="delete-button" onClick={() => makeSure(d.id, "CANCELLED")}>Cancel</button>}
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

export default MyReservations;