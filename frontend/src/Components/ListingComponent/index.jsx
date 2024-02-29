import React from "react";
import "./ListingComponent.css";
import {Link} from "react-router-dom";
import CommentsComponent from "../CommentsComponent";
import ImageList from "../ImageList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import * as Yup from "yup";
import axios from "axios";
import { APIContext } from "../../Contexts";
import { useFormik } from "formik";
import {useParams } from "react-router-dom";

const ListingComponent = ({house}) => {
    const navigate = useNavigate();
    const { link  } = useContext(APIContext)
    const token = localStorage.getItem('token') || '';
    // const [imageData, setImageData] = useState(0);
    // const fileRef = useRef(null);

    const formik = useFormik({
        initialValues : {
          name: "",
          title: "",
          content: "",
          rating: "", 
      },
        onSubmit : (values) => {
            const form_data = new FormData()
            form_data.append("property_id", house.id)
            form_data.append("name", formik.values.name)
            form_data.append("title", formik.values.title)
            form_data.append("content", formik.values.content)
            form_data.append("rating", formik.values.rating)
              axios.post(link+"/comments/create_comment/", form_data, {
                  headers: {
                      "Authorization": `Token ${token}`,
                      "Content-Type" : "application/json"
                  }
              }).then((response) => {
                window.location.reload();
              }).catch((response) => {
                  if (response.request.status === 409) {
                      alert("A user with that username already exists.")
                  } else {
                      console.log(response)
                      alert("You must be logged in to comment.")
                  }
              })
          },
  
          validationSchema: Yup.object({
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
                      .required("This field is required."),
          })
      })
    //

    var bool = house.avaliable_to_reserve
    var av_class = `${ bool ? 'btn-avail' : 'btn-unavail' }`
  
    const [comments, setComments] = useState([])
  
    const fetchCommentsData = () => {
      fetch("http://127.0.0.1:8000/comments/all_comment/")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setComments(data)
        })
    }
  
    useEffect(() => {
      fetchCommentsData()
    }, [])
  
    var data_comments = (comments.results ?? [])

    let numbers = [];
    while (numbers.length < 3) {
        let randomNumber = Math.floor(Math.random() * 11) + 1;
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }
    let num1 = 'http://127.0.0.1:8000/media/uploads/' + numbers[0] + ".png"
    let num2 = 'http://127.0.0.1:8000/media/uploads/' + numbers[1] + ".png"


    // images

    // console.log('house',house.id)
    const [images, setImages] = useState([])
    const { id } = useParams();
    const fetchImagesData = () => {
      fetch(`http://127.0.0.1:8000/property/allimages/?property_id=${id}`,
        {
            method: 'GET',
            headers: {
            'Authorization': `Token ${token}`,
            },
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
            data.results.push({property_id: id, image: num1})
            data.results.push({property_id: id, image: num2})
            setImages(data)
        })
    }
    useEffect(() => {
      fetchImagesData()
    }, [])
  
    var all_images = (images.results ?? [])
    console.log('all_images',all_images)


    return (
        <div className="building-component">
            <div className="row"> 
                <img className="first-img" src={house.image} />
            </div> 
            {/* <div className="row"> 
                <img className="second-img" src={num1} />
                <img className="second-img" src={num2} />
            </div> */}
            <div className="row"> 
                <ImageList images={all_images} />
            </div>
            <div className="row">
                <h1> {house.name} </h1>
            </div>
            <div className="row">
                <h5> Property ID: {house.id} </h5>
            </div>
            <div className="row" id="description">
                <p>
                    {house.description}
                </p>

            </div>
            <div className="amenities">
                <div className="house-properties">
                    <p>Location: {house.location}</p>
                </div>
                <div className="house-properties">
                    <p>Guests: {house.number_of_guests}</p>
                </div>
                <div className="house-properties">
                    <p>Beds: {house.number_of_beds}</p>
                </div>
            </div>
            <br></br>
            <br></br>
            <div>
                <h2>User Reviews: </h2>
            </div>


            <div className="reviews">  
                {data_comments.map(function(d, idx){
                    if (d.property_id === house.id){
                        return (<CommentsComponent comment = {d} key={idx}></CommentsComponent>)
                    }
                })}
            </div>
            
            <div className="form-container">
            <h2>Create A Comment</h2>
            <form action="POST" onSubmit={formik.handleSubmit}>
               
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


            <div className="button-container">
                <button id="hostbutton" onClick={() => navigate("hostcomments/")}>
                        Write a Comment For Guests
                </button>
            </div>
        </div>
        
    )   
}

export default ListingComponent;
