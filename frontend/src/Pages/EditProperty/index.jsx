import './EditProperty.css'
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import axios from "axios";
import { APIContext } from "../../Contexts";
import { useFormik } from "formik";
import { useLocation } from 'react-router-dom';


const EditProperty = (props) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { link  } = useContext(APIContext)
  const token = localStorage.getItem('token')
  const apiEndpoint = link+"/property/update_property/"+id+"/"
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date()
  const [imageData, setImageData] = useState(0);
  const fileRef = useRef(null);
  const [avail, setAvail] = useState([])
  
  const handleImageChange = (e) => {
    setImageData(e.target.files[0]);
  };

  const house = useLocation().state.house
  if (house.avaliabile_to_reserve) {
    setAvail(["on"])
  }
  const formik = useFormik({
      initialValues : {
        name: house.name,
        location: house.location,
        description: house.description,
        numberGuests: house.number_of_guests,
        numberBeds: house.number_of_beds,
        area: house.area,
        availabilityIn: house.availability,
        availabilityOut: house.availability,
        file : fileRef,
        availabileToReserve : []
    },
      onSubmit : (values) => {
          const form_data = new FormData()
          form_data.append("name", formik.values.name)
          form_data.append("location", formik.values.location)
          form_data.append("description", formik.values.description)
          form_data.append("number_of_guests", formik.values.numberGuests)
          form_data.append("number_of_beds", formik.values.numberBeds)
          form_data.append("area", formik.values.area)
          form_data.append("avaliability", "2020-11-28T19:24:58.478641+05:30")
          form_data.append("image", imageData)
          //form_data.append("available_to_reserve", formik.values.availabileToReserve)
          if (formik.values.availabileToReserve.length===0) {
            form_data.append("avaliable_to_reserve", false)
          } else {
            form_data.append("avaliable_to_reserve", true)
          }
          for (var pair of form_data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
          axios.put(apiEndpoint, form_data, 
                    {
                    headers: {
                      "Authorization": `Token ${token}`,
                    }
                    }).then((response) => {
                console.log(response.status, response.data.token);
          });
          navigate("/myproperties")
        },
        validationSchema: Yup.object({
            name: Yup
                    .string()
                    .max(30, "Must be 30 characters or less.")
                    .required("This field is required."),
            location: Yup
                    .string()
                    .max(100, "Must be 100 characters or less.")
                    .required("This field is required."),
            description: Yup
                    .string()
                    .max(1000, "Must be 1000 characters or less.")
                    .required("This field is required."),
            numberGuests: Yup
                    .number()
                    .min(1,"Number of guests must be greater than 0.")
                    .required("You must specify number of guests."),
            numberBeds: Yup
                    .number()
                    .min(1,"Number of beds be greater than 0.")
                    .required("You must specify number of beds."),
            area: Yup
                    .number()
                    .min(1,"Area must be greater than 0.")
                    .required("You must specify the area of the house."),
            availabilityIn: Yup
                    .date()
                    .default(today)
                    .min(today, "Start date should be later than today.")
                    .required("This field is required."),
            availabilityOut: Yup
                    .date()
                    .default(startDate)
                    .min(startDate, "End date should be equal or later than today.")
                    .required("This field is required."),
        })
    })

  
      return(
        <div className="form-container">
            <h2>Update Property</h2>
            <form action="POST" onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name" 
                        type="text"
                        placeholder=''
                        value={formik.values.name}
                        onChange={formik.handleChange}                            
                        onBlur={formik.handleBlur}
                     />            
                </div>
                <div className="error-container">{formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}</div>
                <div className="input-container">
                    <label htmlFor="location">Location:</label>
                    <input
                        id="location" 
                        type="text"
                        placeholder=''
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.location && formik.errors.location ? <p>{formik.errors.location}</p> : null}</div>
                <div className="input-container">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description" 
                        type="text"
                        placeholder=''
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.description && formik.errors.description ? <p>{formik.errors.description}</p> : null}</div>
                <span className="number-container">
                    <div className="input-container">
                        <label htmlFor="numberGuests">Guests:</label>
                        <input
                            id="numberGuests" 
                            type="number"
                            placeholder=''
                            value={formik.values.numberGuests}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="numberBeds">Beds:</label>
                        <input
                            id="numberBeds" 
                            type="number"
                            placeholder=''
                            value={formik.values.numberBeds}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="area">Area:</label>
                        <input
                            id="area" 
                            type="number"
                            placeholder=''
                            value={formik.values.area}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </span>
                <div className="error-container">{formik.touched.numberGuests && formik.errors.numberGuests ? <p>{formik.errors.numberGuests}</p> : null}</div>
                <div className="error-container">{formik.touched.area && formik.errors.area ? <p>{formik.errors.area}</p> : null}</div>
                <div className="error-container">{formik.touched.numberBeds && formik.errors.numberBeds ? <p>{formik.errors.numberBeds}</p> : null}</div>
                <span className='date-container'>
                    <div className="error-container">{formik.touched.file && formik.errors.file ? <p>{formik.errors.file}</p> : null}</div>
                    <div className="input-container">
                        <label htmlFor="area">Available From:</label>
                        <input
                            id="availabilityIn" 
                            type="date"
                            placeholder=''
                            value={formik.values.availabilityIn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="error-container">{formik.touched.availabilityIn && formik.errors.availabilityIn ? <p>{formik.errors.availabilityIn}</p> : null}</div>
                    <div className="input-container">
                        <label htmlFor="area">Available Until:</label>
                        <input
                            id="availabilityOut" 
                            type="date"
                            placeholder=''
                            value={formik.values.availabilityOut}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="error-container">{formik.touched.availabilityOut && formik.errors.availabilityOut ? <p>{formik.errors.availabilityOut}</p> : null}</div>
                    <div className="input-container">
                        <label htmlFor="image">Choose Images</label>
                        <input type="file" 
                            id="image"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={(e) => {handleImageChange(e)}}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="availabileToReserve">Rent Out:</label>
                        <input type="checkbox" 
                            id="availabileToReserve"
                            onChange={formik.handleChange}
                        />
                    </div>
                </span>
                <div className="button-container">
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

    



  
}

export default EditProperty