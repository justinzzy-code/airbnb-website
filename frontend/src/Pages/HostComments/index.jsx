import './hostcomments.css'
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import * as Yup from "yup";
import axios from "axios";
import { APIContext } from "../../Contexts";
import { useFormik } from "formik";


const HostComments = (props) => {
  const navigate = useNavigate();
  const { link } = useContext(APIContext);
  const token = localStorage.getItem('token') || '';


  const formik = useFormik({
      initialValues : {
        recipient: "",  
        name: "",
        title: "",
        content: "", 
        rating: "",
    },
      onSubmit : (values) => {
          const form_data = new FormData()
          form_data.append("recipient", formik.values.recipient)
          form_data.append("name", formik.values.name)
          form_data.append("title", formik.values.title)
          form_data.append("content", formik.values.content)
          form_data.append("rating", formik.values.rating)

          axios.post(link+"/comments/create_commentforuser/", form_data, {
                headers: {
                          "Authorization": `Token ${token}`,
                          "Content-Type" : "application/json"
                }
            }).then((response) => {
                if (response.status === 200) {
                    alert("Comment posted.")
                    navigate("/myproperties")
                }
            }).catch((response) => {
                if (response.request.status === 409) {
                    alert("A conflict with the recipient exists.")
                } else {
                    console.log(response)
                    alert("An unknown error occurred.")
                }
                
            })
        },
        validationSchema: Yup.object({
            recipient: Yup
                    .string()
                    .max(50, "Must be 50 characters or less.")
                    .required("This field is required."),
            name: Yup
                    .string()
                    .max(50, "Must be 50 characters or less.")
                    .required("This field is required."),
            title: Yup
                    .string()
                    .max(100, "Must be 100 characters or less.")
                    .required("This field is required."),
            content: Yup
                    .string()
                    .max(500,"Must be 500 characters or less.")
                    .required("This field is required."),
            rating: Yup
                    .number()
                    .max(5,"Maximum rating must be 5.")
                    .min(1, "Minimum rating must be 1.")
                    .required("This field is required"),
        })
    })

  
      return(
        <div className="form-container">
            <h2>Write a Comment About Guests</h2>
            <form action="POST" onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <label htmlFor="recipient">Recipient: </label>
                    <input
                        id="recipient" 
                        type="text"
                        placeholder=''
                        value={formik.values.recipient}
                        onChange={formik.handleChange}                            
                        onBlur={formik.handleBlur}
                     />            
                </div>
                <div className="error-container">{formik.touched.recipient && formik.errors.recipient ? <p>{formik.errors.recipient}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="name">Name: </label>
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
                    <label htmlFor="title">Title: </label>
                    <input
                        id="title" 
                        type="text"
                        placeholder=''
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="content">Content: </label>
                    <textarea
                        id="content" 
                        type="text"
                        placeholder=''
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.content && formik.errors.content ? <p>{formik.errors.content}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="rating">Rating: </label>
                    <input
                        id="rating" 
                        type="number"
                        placeholder=''
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.rating && formik.errors.rating ? <p>{formik.errors.rating}</p> : null}</div>
                

                <div className="button-container">
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )


}

export default HostComments