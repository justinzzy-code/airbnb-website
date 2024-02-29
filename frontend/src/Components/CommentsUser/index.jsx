import React from "react";
import "./commentuser.css";

const CommentsUser = ({usercomment}) => {

    
    return (
        <div className="container" id="cardcontainer">
            <h2>{usercomment.title}</h2>
            <h3>Rating: {usercomment.rating}</h3>
            <p>
                {usercomment.content}
                <br />
                <br />
                {usercomment.name}
                <br />
                {usercomment.date.substring(0,10)}
            </p>
        </div>
            
    )   
}

export default CommentsUser;
