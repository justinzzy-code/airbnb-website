import './EditProfile.css'
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import * as Yup from "yup";
import axios from "axios";
import { APIContext } from "../../Contexts";
import { useFormik } from "formik";


const EditProfile = (props) => {
  const navigate = useNavigate();
  const { link  } = useContext(APIContext)
  const token = localStorage.getItem('token') || '';
  const apiEndpoint = link+"/accounts/updateProfile/"
  const [imageData, setImageData] = useState(0);
  const fileRef = useRef(null);
  
  const handleImageChange = (e) => {
    setImageData(e.target.files[0]);
  };

  const formik = useFormik({
      initialValues : {
        username: "",  
        first_name: "",
        last_name: "",
        email: "", 
        phone_num: "",
        avatar : fileRef,
    },
      onSubmit : (values) => {
          const form_data = new FormData()
          form_data.append("username", formik.values.username)
          form_data.append("first_name", formik.values.first_name)
          form_data.append("last_name", formik.values.last_name)
          form_data.append("email", formik.values.email)
          form_data.append("phone_num", formik.values.phone_num)
          form_data.append("avatar", imageData)

          axios.put(apiEndpoint, form_data, {
                headers: {
                          "Authorization": `Token ${token}`,
                }
            }).then((response) => {
                if (response.status === 200) {
                    alert("You must sign in again after editing profile!")
                    navigate("/logout")
                }
            }).catch((response) => {
                console.log(response)
                if (response.request.status == 400) {
                    alert("A user with that username already exists.")
                } else {
                    alert("An unknown error occurred.")
                }
                
            })
        },
        validationSchema: Yup.object({
            username: Yup
                    .string()
                    .max(50, "Must be 50 characters or less.")
                    .required("This field is required."),
            first_name: Yup
                    .string()
                    .max(50, "Must be 50 characters or less.")
                    .required("This field is required."),
            last_name: Yup
                    .string()
                    .max(50, "Must be 50 characters or less.")
                    .required("This field is required."),
            email: Yup
                    .string()
                    .email()
                    .max(80,"Must be 80 characters or less.")
                    .required("This field is required."),
            phone_num: Yup
                    .number("Must be a number").typeError('Phone number must be a number')
                    .required("This field is required"),
        })
    })

  
      return(
        <div className="form-container">
            <h2>Update Profile</h2>
            <form action="POST" onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <label htmlFor="username">Username: </label>
                    <input
                        id="username" 
                        type="text"
                        placeholder=''
                        value={formik.values.username}
                        onChange={formik.handleChange}                            
                        onBlur={formik.handleBlur}
                     />            
                </div>
                <div className="error-container">{formik.touched.username && formik.errors.username ? <p>{formik.errors.username}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="first_name">First name: </label>
                    <input
                        id="first_name" 
                        type="text"
                        placeholder=''
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.first_name && formik.errors.first_name ? <p>{formik.errors.first_name}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="last_name">Last name: </label>
                    <textarea
                        id="last_name" 
                        type="text"
                        placeholder=''
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.last_name && formik.errors.last_name ? <p>{formik.errors.last_name}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="email">Email: </label>
                    <textarea
                        id="email" 
                        type="text"
                        placeholder=''
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="phone_num">Phone Number: </label>
                    <textarea
                        id="phone_num" 
                        type="text"
                        placeholder=''
                        value={formik.values.phone_num}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="error-container">{formik.touched.phone_num && formik.errors.phone_num ? <p>{formik.errors.phone_num}</p> : null}</div>
                
                <div className="input-container">
                    <label htmlFor="image">Choose Images</label>
                    <input type="file" 
                        id="image"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={(e) => {handleImageChange(e)}}
                    />
                </div>

                <div className="button-container">
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )


}

export default EditProfile