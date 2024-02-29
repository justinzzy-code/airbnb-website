import {React, useState} from 'react'
import axios from "axios";
import "./CreatePropertyComponent.css";



const CreateProperty = ({data}) => {
    
    return (
            <div class="">
                <h2>{comment.title}</h2>
                    <p>
                    {comment.content}
                    <br />
                    <br />
                    {comment.date.substring(0,10)}
                    <br />
                    {comment.name}
                </p>
            </div>
            
    )   
}

export default CreateProperty;
