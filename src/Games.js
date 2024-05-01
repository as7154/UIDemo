import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './Games.css'

const ENDPOINT = "http://127.0.0.1:50000"; 

const Games = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // socket.on("connect", () => {
    //   console.log("Games: Connected to server");
    // });
    // socket.on("disconnect", () => {
    //   console.log("Games: Disconnected from server");
    // });
    socket.on("games_updated", (games) => {
      setData(games);
      console.log(games)
    });

    fetchGames();

    return () => socket.disconnect();
  }, []);

  const fetchGames = () => {
    fetch('/games')
      .then(res => res.json())
      .then(data => {
        setData(data.games);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <div>Games</div>
      <hr></hr>
      <div>
        {data.map(game => (
            <div key={game.id}>
                <p>ID: {game.id}</p>
                <p>Game Type: {game.gametype}</p>
                <p>Total Bet: {game.totalbet}</p>
                <p>Minimum Bet: {game.minbet}</p>
            </div>
    ))}
      </div>
    </div>
  );
}

export default Games