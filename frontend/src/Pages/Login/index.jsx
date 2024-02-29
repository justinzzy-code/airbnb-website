import './Login.css';
import {React, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { APIContext } from "../../Contexts";
const server_url = "http://127.0.0.1:8000";

function LoginPage() {
  const navigate = useNavigate();
  let [token, setLoginToken] = useState(() => localStorage.getItem("token") ? localStorage.getItem("token") : null);
  const { setToken } = useContext(APIContext)
  const [errorMessage, setErrorMessage] = useState("")
  let login2 = async(username, password, setError) => {
      axios.post(`${server_url}/accounts/login/`, {
          username: username,
          password: password
      }).then((res) => {
          if (res.status === 200) {
              setLoginToken(res.data.token)
              console.log(res.data.token)
              setToken(res.data.token)
              localStorage.setItem("token", res.data.token)
              setErrorMessage("")
              navigate("/profile")
              window.location.reload();
          }
      }).catch(() => {
          setErrorMessage("Password or username incorrect.")
      })
  }

    let [user, setUser] = useState({
        username: '',
        password: '',
    })

    let [error, setError] = useState(null)

    const onChange = (e) => {
        setUser((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    let loginUser = (e) => {
        e.preventDefault()
        login2(user.username, user.password, setError)
    }

    return (
        <>
        <div className="login-container">
            {error && <p className='error-message'>{error}</p>}
            <form className="text-center" onSubmit={loginUser}>
                <h1>Login</h1>
                <div className="row" id="username-row">
                    <label className="col-sm-2 col-form-label col-form-label-md">Username:</label>
                    <div className="col">
                        <input onChange={onChange} value={user.username} name="username" required={true} type="username" className="form-control form-control-lg" id="username"/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="password" className="col-sm-2 col-form-label col-form-label-md">Password:</label>
                    <div className="col">
                    <input onChange={onChange} required={true} value={user.password} name="password" type="password" className="form-control form-control-lg" id="password"/>
                    </div>
                </div>
                {!(errorMessage==="") && (
                    <div className="row" id="error-row">
                        <p>{errorMessage}</p>
                    </div>
                )}
                
                <div className="button-row">
                    <button id="login-button" type="submit" className="btn btn-lg btn-primary">Login</button>
                </div>
                <div>
                    <button className="btn btn-lg btn-primary" id="register-button" onClick={() => navigate("register/")}>Register</button>
                </div>
            </form>

        </div>

        </>
    )
}

export default LoginPage