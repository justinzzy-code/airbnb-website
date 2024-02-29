import './CreateNewReservation.css'
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, } from "react"

const server_url = "http://127.0.0.1:8000";
const CreateNewReservation = (property_id) => {
  const navigate = useNavigate();
  const { id } = useParams();
  let create = (info) => {

    const formData = new FormData();
    formData.append("start_date",info.start_date)
    formData.append("end_date",info.end_date)
    formData.append("property_id", id)

    
    const token = localStorage.getItem('token') || '';
    fetch(`${server_url}/property/create_reservation/`, 
      {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
          },
          body: formData,
      }).then((res) => {
        if (res.status < 400 ) {
            console.log(res.status)
        }
      }).catch(() => {
        console.log("Fill in all fields")
    })
  }  

  let [info, setUser] = useState({
    start_date: '2023-04-08T17:05:00Z',
    end_date: '2023-04-08T17:05:00Z',
    property_id: id,
    })

  const onChange = (e) => {
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
  }

  let createBuilding = (e) => {
    e.preventDefault();
    create(info);
    navigate("/myreservations")
    window.location.reload();
}
 
  return (
    <>
    <div className="create">
        <h2>Create Reservation</h2>
        <form className="text-center" onSubmit={createBuilding}>
            <div>
                <label>Start Date:</label>
                <input name="start_date" type ='date' onChange={onChange} defaultValue={info.start_date} required={true} />
                <label> End Date:</label>
                <input name="end_date" type ='date' onChange={onChange} defaultValue={info.end_date} required={true} />
            </div>
            <div className="col-auto my-1">
                <button type="submit">Submit</button>
            </div>

        </form>

    </div>

    </>
  );
}

export default CreateNewReservation;