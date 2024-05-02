import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import "./Members.css"

const ENDPOINT = "http://127.0.0.1:50000"; 

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // socket.on("connect", () => {
    //   console.log("Connected to server");
    // });
    // socket.on("disconnect", () => {
    //   console.log("Disconnected from server");
    // });
    socket.on("members_updated", (members) => {
      setData(members);
    });

    fetchMembers();

    return () => socket.disconnect();
  }, []);

  const fetchMembers = () => {
    fetch('/members')
      .then(res => res.json())
      .then(data => {
        setData(data.members);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="users">
      <h1 className='user-title'>ONLINE</h1>
      <hr className ='user-hr'></hr>
      <div className="members">
        {data.map((member, index) => (
          <div key={index}>{member}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
