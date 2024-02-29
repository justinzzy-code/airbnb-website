import { useFormik } from "formik";
import { useContext, useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import "./ImageList.css";
import axios from "axios";
import { createContext } from "react";
import { APIContext } from "../../Contexts";
import { useNavigate, useParams } from "react-router-dom";


const ImageList = ({ images }) => {
    return (
        <div className="image-list">
            {images.map(image => (
                <div key={image.proprety_id}>
                    <img src={image.image}/>
                </div>
            ))}
        </div>
    );
}

export default ImageList;