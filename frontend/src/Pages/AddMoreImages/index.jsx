import './CreateNewReservation.css'
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, } from "react"

const server_url = "http://127.0.0.1:8000";


const AddMoreImage = (property_id) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token') || '';
  const [image, setImage] = useState("");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("property_id", id);
    formData.append("image", image);

    fetch(`${server_url}/property/allimagecreate/`, 
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

  navigate("/myproperties")
  window.location.reload();
  };

  return (
    <div className="create">
    <form onSubmit={handleSubmit}>
        <label htmlFor="image"> Add Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default AddMoreImage;



