import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import CommentsUser from '../../Components/CommentsUser';
import "./Profile.css"

const Profile = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const token = localStorage.getItem('token') || '';

    const fetchUserData = () => {
      fetch("http://127.0.0.1:8000/accounts/profile/", {
        method: 'get',
        headers: {
            'Authorization': `Token ${token}`,
        }
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
    }
    
    useEffect(() => {
      fetchUserData()
    }, [])
    
    var data = (users ?? [])


    const [comments, setComments] = useState([])
  
    const fetchCommentsData = () => {
      fetch("http://127.0.0.1:8000/comments/all_commentforuser/")
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

    return(
        <div>
            <div className="profile">
                <div className="row" id="imgRow"> 
                    <img className="picture" src={data.avatar} alt="profilepic"/>
                </div> 
                <div className="row"> 
                    <p>Username: {data.username}</p>
                </div> 
                <div className="row">
                    <p>First Name: {data.first_name}</p>
                </div>
                <div className="row">
                    <p>Last Name: {data.last_name}</p>
                </div>
                <div className="row">
                    <p>Email: {data.email}</p>
                </div>
                <div className="row">
                    <p>Phone Number: {data.phone_num}</p>
                </div>
                <div className="row" id="buttonRow">
                    <button onClick={() => navigate("editprofile/")}>Edit Profile</button>
                </div>
            </div>
            <h2 id='temp'>Comments About You</h2> 
            <div className="reviews2">
                <br></br> 
                {data_comments.map(function(d, idx){
                    if (d.recipient == data.username){
                        return (<CommentsUser usercomment = {d} key={idx}></CommentsUser>)
                    }
                })}
            </div>
        </div>
        
    )
}

export default Profile;