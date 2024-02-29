import { useFormik } from "formik";
import { useContext, useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import "./HostingForm.css";
import axios from "axios";
import { createContext } from "react";
import { APIContext } from "../../Contexts";
import { useNavigate, useParams } from "react-router-dom";


const HostingForm = () => {
    const navigate = useNavigate();
    const { link  } = useContext(APIContext)
    const token = localStorage.getItem("token")
    const apiEndpoint = link+"/property/create_property/"
    const [startDate, setStartDate] = useState(new Date());
    const today = new Date()
    const [imageData, setImageData] = useState(0);

    const fileRef = useRef(null);

    const handleImageChange = (e) => {
        setImageData(e.target.files[0]);
    };

    const formik = useFormik({
        initialValues : {
            name: "",
            location: "",
            description: "",
            numberGuests: 0,
            numberBeds: 0,
            area: 0,
            availabilityIn: "",
            availabilityOut: "",
            file : fileRef,
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
            
            axios.post(apiEndpoint, form_data, 
                    {
                    headers: {
                      "Authorization": `Token ${token}`,
                    }
                    }).then((response) => {
                console.log(response.status, response.data.token);
                navigate("/myproperties")
            });
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
            <h2>Create New Listing</h2>
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

export default HostingForm;