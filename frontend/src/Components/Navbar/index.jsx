import './Navbar.css';
import {Link} from "react-router-dom"
import {React, useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIContext } from "../../Contexts";
import { PopupMenu } from "react-simple-widgets";
import logo from'../Images/kia.png';


const Navbar = () => {
    const [navbarState, setNavbar] = useState(0)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loggedIn, setLoggedIn] = useState(!!token);


    const updateNavbar = () => {
        setLoggedIn(isLoggedIn())
        console.log("logedin: "+isLoggedIn())
        setNavbar(navbarState+1)
    }

    useEffect(() => {
        updateNavbar()
    }, [token])

    function isLoggedIn() {
        const current_token = localStorage.getItem('token'); 
        setToken(current_token)
        return !!current_token;
      }

    return(
        <div className="topbar" id="Topbar" >
            <img className='amblem' src={logo} alt="" />
            <Link onClick={updateNavbar} className="link" id="home" to="/home">Home</Link>
            <Link onClick={updateNavbar} className="link" id ="allproperties" to="/allreservations">Rent Now</Link>
            {loggedIn ? (       
                <PopupMenu>
                    <button className="btn" id="menu-button">Menu</button>
                        <div className='lines'>
                            <div className='menu-line' id="top-menu-line">
                                <Link onClick={updateNavbar} className="hidden-link" id="profile" to="/profile"><p className="tab-name">Profile</p></Link>
                            </div>
                            <div className='menu-line'>
                                <Link onClick={updateNavbar} className="hidden-link" id="myproperties" to="/myproperties"><p className="tab-name">My Properties</p></Link>
                            </div>
                            <div className='menu-line'>
                                <Link onClick={updateNavbar} className="hidden-link" id="myreservations" to="/myreservations"><p className="tab-name">My Reservations</p></Link>
                            </div>
                            <div className='menu-line'>
                                <Link onClick={updateNavbar} className="hidden-link" id="host" to="/host"><p className="tab-name">Host</p></Link>
                            </div>
                            <div className='menu-line'>
                                <Link onClick={updateNavbar} className="hidden-link" id="notifications" to="/notifications"><p className="tab-name">Notifications</p></Link>
                            </div>
                            <div className='menu-line' id="bottom-menu">
                                <Link onClick={updateNavbar} className="hidden-link" id="logout" to="/logout"><p className="tab-name">Log Out</p></Link>
                            </div>
                        </div>
                </PopupMenu>) : (<Link onClick={updateNavbar} className="link" id ="signin" to="/signin">Log In</Link>)}
        </div>
        

    )
}

export default Navbar;