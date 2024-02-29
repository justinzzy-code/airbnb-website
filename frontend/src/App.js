
import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './Components/Layout'
import { APIContext } from './Contexts';
import Home from './Pages/Home';
import CreateNewListing from './Pages/CreateNewListing';
import Notifications from './Pages/Notifications';
import Profile from './Pages/Profile';
import Host from './Pages/Host';
import MyProperties from './Pages/MyProperties';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import ListingPage from './Pages/ListingPage';
import EditProperty from './Pages/EditProperty';
import EditProfile from './Pages/EditProfile';
import MyReservations from './Pages/Reservations';
import AllReservations from './Pages/AllReservations';
import CreateNewReservation from './Pages/CreateNewReservation';
import Register from './Pages/Register';
import HostComments from './Pages/HostComments';
import AddMoreImage from './Pages/AddMoreImages';

function App() {

  const [token, setToken] = useState(0);
  const [link, setLink] = useState("http://127.0.0.1:8000");

  return (
    <APIContext.Provider value={{token, setToken, link, setLink}}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element= {<Home/>} />
              <Route path="myproperties" element= {<MyProperties/>} /> 
              <Route path="host" element= {<Host/>} />
              <Route path="allreservations" element= {<AllReservations/>} />
              <Route path="notifications" element= {<Notifications/>} />
              <Route path="profile" element= {<Profile/>} />
              <Route path="profile/editprofile" element= {<EditProfile/>} />
              <Route path="signin" element= {<Login/>} />
              <Route path="logout" element= {<Logout/>} />
              <Route path="myreservations" element= {<MyReservations/>} />
              <Route path="buildingpage/:id" element= {<ListingPage/>} />
              <Route path="createproperty" element= {<CreateNewListing/>} />
              <Route path="createreservation/:id" element= {<CreateNewReservation/>} />
              <Route path="updateproperty/:id" element= {<EditProperty />} />
              <Route path="signin/register" element= {<Register/>} />
              <Route path="buildingpage/:id/hostcomments" element= {<HostComments/>} />
              <Route path="addimage/:id" element= {<AddMoreImage/>} />
            </Route>      
        </Routes>
      </BrowserRouter>
    </APIContext.Provider>
  );
}

export default App;
