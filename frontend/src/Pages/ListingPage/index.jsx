import './ListingPage.css'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import ListingComponent from '../../Components/ListingComponent';


const ListingPage = () => {
  const { id } = useParams();


  const [users, setUsers] = useState([])
  
  const fetchUserData = () => {
    fetch( "http://127.0.0.1:8000/property/get_property/"+id )
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
 

 
  return (
    <div class="">
      <ListingComponent house = {data}></ListingComponent> 
      {/* {data_comments.map(function(d, idx){
          return (<CommentComponent comment = {d}></CommentComponent>)
        })} */}

    </div>
  );
}

export default ListingPage;