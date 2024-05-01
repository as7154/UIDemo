import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './User.css'

const ENDPOINT = "http://127.0.0.1:50000"; 

const User = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("user_updated", (user) => {
      setData(user);
      console.log(user)
    });

    fetchUser();

    return () => socket.disconnect();
  }, []);

  const fetchUser = () => {
    fetch('/user')
      .then(res => res.json())
      .then(data => {
        setData(data.user);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <div>User</div>
      <hr></hr>
      <div>
        {data.map((user, index) => (
            <div key={index}>
                <p>{user.name}</p>
                <p>{user.balance}</p>
            </div>
    ))}
      </div>
    </div>
  );
}

export default User