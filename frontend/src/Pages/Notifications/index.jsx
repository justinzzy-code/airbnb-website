import { APIContext } from "../../Contexts";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Notifications.css'
import { wait } from "@testing-library/user-event/dist/utils";

const Notifications = () => {
    const navigate = useNavigate();
    const { link  } = useContext(APIContext)
    const token = localStorage.getItem('token') || '';
    const [notifications, setNotif] = useState([]);
    const [display, setDisplay] = useState([])
    const [deletion, setDeletion] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const [total, setTotal] = useState(0)
    const [buttons, setButtons] = useState([1])
    const [isThere, setIsThere] = useState("")
    
    useEffect(() => {
        fetch(link+`/notifications/view_all_notifications/?p=${pageNum}`, {
            headers: {
                'Authorization': `Token ${token}`,
                "Content-Type" : "application/json"
              },
          })
            .then(response => {
              return response.json()
            })
            .then(data => {
                setTotal(data.count)
                var result = [];
                for(var i in data.results)
                    result.push(data.results[i]);
                setNotif(result)
                if ((data.detail) === "Invalid page.") {
                    setPageNum(pageNum-1)
                }
                return data.count
            })
            .then ((count) => {
                const tempButtons = []
                {for (let i = 1; i<=Math.ceil(count/6); i++) {
                    tempButtons.push(
                        <>
                            <input key={"i"+i} type="radio" id={i} name="pageNum" value={i} onClick={filter}/>
                            <label key={"l"+i} htmlFor={i} className="p1">{i}</label>
                        </>   
                    )
                }}
                setButtons(tempButtons)
                if (count === 0) {
                    setPageNum(1)
                    setIsThere("You have no new notifications!")
                }
            })
    }, [deletion, pageNum])

    const deleteNotification = (id) => {
        fetch(link+"/notifications/delete_notifications/"+id+"/", {
            method: 'delete',
            headers: {
                'Authorization': `Token ${token}`,
                },
            })
            .then(response => {
                setDeletion(deletion+1)
            })
    }    

    function filter(event) {
        setPageNum(document.querySelector('input[name="pageNum"]:checked') ? document.querySelector('input[name="pageNum"]:checked').value : '')
      }

    return(
        <>
        <div className='notifications-holder'>
            <h1>Notifications</h1>
            <p id="is-there">{isThere}</p>
            {notifications.map( (notif,index)=>(  
                    <span  className='notif-row' key={"s"+index}>
                        <div key={"d"+index}>{notif.description}</div>
                        <button className='notif-button' onClick={() => {
                            deleteNotification(notif.id)
                        } }>Delete</button>
                    </span>
            ))}
        </div>
        <div className="pagination">
          <fieldset id="pageNum">
            Pages
            <br/>
            {buttons}
          </fieldset>
        </div>
        </>
    )
}

export default Notifications;