import PropertyCard from '../../Components/PropertyCard'
import './Home.css'
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

const Home = () => {
  
   const [searchParams, setSearchParams] = useSearchParams();
    
    var name = searchParams.get("name") || ''
    var location = searchParams.get("location") || ''
    var ordering = searchParams.get("ordering") ? "&ordering=" +  searchParams.get("ordering") : '';
    var pageNum = searchParams.get("p") || '1'

    const [filter_data, setUsers] = useState([])
    // /property/all_property/?area=&avaliability=&id=&location=&name=&number_of_beds=&number_of_guests=&p=2
    const token = localStorage.getItem('token') || '';

    const fetchFilterData = () => {
      fetch('http://127.0.0.1:8000/property/all_property/?name='+name+"&location="+location+ordering+'&p='+pageNum, {
          method: 'get',
          headers: {
            'Authorization': `Token ${token}`,
          },
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUsers(data)
        })
    }
  
    useEffect(() => {
      fetchFilterData()
    }, [])

    var data = (filter_data.results ?? [])

    function filter(event) {
      event.preventDefault();
      var name = document.getElementById("name").value;
      var location = document.getElementById("location").value;
      var ordering = document.querySelector('input[name="ordering"]:checked') ? document.querySelector('input[name="ordering"]:checked').value : ''
      ordering = ordering || (searchParams.get("ordering") ? searchParams.get("ordering") : '');
      var pageNum = document.querySelector('input[name="pageNum"]:checked') ? document.querySelector('input[name="pageNum"]:checked').value : '';
      window.location.href = window.location.pathname+"?name="+name+"&location="+location+"&ordering="+ordering+'&p='+pageNum;

    }
    
    for (var i=1; i<5; i++) {
      for (var elem of document.getElementsByClassName(`p${i}`)) {
        if (i < Math.ceil(filter_data.count/3) + 1) {
          elem.style.display = "inline-block";
        } else {
          elem.style.display = "none";
        }
      }
    }
    return (
      <>
      <div className="form">

      <form method="get" onSubmit={filter} className="my-filter-form">
          <div className="search">
            <label htmlFor="name">Name of property:</label>
            <input id="name" type="text"></input>
            <label htmlFor="location">Location</label>
            <input id="location" type="text"></input>
          </div>
          <div className="filter">
            <fieldset id="ordering">
              <input type="radio" id="xx" name="ordering" value="-number_of_beds" />
              <label htmlFor="xx">Number of beds decending</label>
              <input type="radio" id="xy" name="ordering" value="number_of_beds" />
              <label htmlFor="xy">Number of beds ascending</label>
              <input type="radio" id="yx" name="ordering" value="-number_of_guests" />
              <label htmlFor="yx">Number of guests decending</label>
              <input type="radio" id="yy" name="ordering" value="number_of_guests" />
              <label htmlFor="yy">Number of guests ascending</label>
            </fieldset>
          </div>
          <input className="filter-button" type="submit" value="Search" />
        </form>

      </div>
       
        <div className="cards">
          {data.map(function(d, idx){
            return (<PropertyCard house = {d} key={idx}></PropertyCard>)
          })}
        </div>
        {/* Pagination */}
        <div className="pagination">
          <fieldset id="pageNum">
            Pages
            <br/>
            <input type="radio" id="p1" name="pageNum" value="1" onClick={filter}/>
            <label htmlFor="p1" className="p1">1</label>
            <input type="radio" id="p2" name="pageNum" value="2" onClick={filter}/>
            <label htmlFor="p2" className="p2">2</label>
            <input type="radio" id="p3" name="pageNum" value="3" onClick={filter}/>
            <label htmlFor="p3" className="p3">3</label>
            <input type="radio" id="p4" name="pageNum" value="4" onClick={filter}/>
            <label htmlFor="p4" className="p4">4</label>
          </fieldset>
        </div>
      </>
    );
    
}

export default Home;