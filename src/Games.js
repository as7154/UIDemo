import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './Games.css'

const ENDPOINT = "http://127.0.0.1:50000"; 
const games = ["Coin Flip", "Dice Roll"]

const Games = () => {
  const [data, setData] = useState([]);
  const [bet, setBet] = useState();

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

  const placeBet = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('new_bet', bet);
    setBet()
  }

  return (
    <div>
      {/* <div>Games</div>
      <hr></hr> */}
      <div className='game-layout'>
        {data.map(game => (
            <div key={game.id} className='game-card'>
                {/* <p>ID: {game.id}</p> */}
                <h1 className='game-title'>{games[game.gametype]}</h1>
                <p className='game-pot'>{game.totalbet}</p>
                {/* <p>Minimum Bet: {game.minbet}</p> */}
                <input
                  className="game-bet-input"
                  type="text"
                  placeholder={"MIN BET: " + game.minbet}
                  value={bet}
                  onChange={(e) => setBet(e.target.value)}
                />
                <button className="game-bet-button" onClick={placeBet}>BET</button>
            </div>
    ))}
      </div>
    </div>
  );
}

export default Games