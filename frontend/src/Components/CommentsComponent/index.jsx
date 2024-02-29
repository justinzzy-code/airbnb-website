import React from "react";
import "./CommentsComponent.css";

const CommentsComponent = ({comment}) => {

    
    return (
            // <div className="card review-card" id="commentcard">
            //     <h2>{comment.title}</h2>
            //     <p>
            //         {comment.content}
            //         <br />
            //         <br />
            //         {comment.name}
            //         <br />
            //         {comment.date.substring(0,10)}
            //     </p>
            // </div>
        <div className="container" id="cardcontainer">
            <h2>{comment.title}</h2>
            <h3>Rating: {comment.rating}</h3>
            <p>
                {comment.content}
                <br />
                <br />
                {comment.name}
                <br />
                {comment.date.substring(0,10)}
            </p>
        </div>
            
    )   
}

export default CommentsComponent;
