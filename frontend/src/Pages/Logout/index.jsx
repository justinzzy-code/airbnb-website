import {React, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIContext } from "../../Contexts";

function LogoutPage() {
    const navigate = useNavigate();
    let [token, setLoginToken] = useState(() => localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const { setToken } = useContext(APIContext)
    const { link  } = useContext(APIContext)

    fetch(link+"/accounts/logout/", {
        method: 'POST',
        credentials :"include",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
          // Include any other headers required by your backend API
        },
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        localStorage.removeItem('sessionData');
        localStorage.removeItem('token');
        console.log(data)
        navigate("/signin")
        window.location.reload();
      }).catch((response) => {
        console.log("error occurred")
        console.log(response)
      })
}

export default LogoutPage;