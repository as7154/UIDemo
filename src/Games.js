import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './Games.css'

const ENDPOINT = "http://127.0.0.1:50000"; 
const games = ["Coin Flip", "Dice Roll"]

const Games = () => {
  const [data, setData] = useState([]);
  const [bet, setBet] = useState("");
  const [pick, setPick] = useState(false);

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

  // const updatePickSelection = (userPick) => {
  //   setPick(userPick);
  // }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== ""){
      setBet(value);
    }
    else {
      setBet("");
    }
  }

  const placeBet = (id) => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('new_bet', [id, bet, pick]);
  }

  

  return (
    
    <div className='game-layout'>
      {data.map(game => (
          <div key={game.id} className='game-card'>
              {/* <p>ID: {game.id}</p> */}
              <h1 className='game-title'>{games[game.gametype]}</h1>
              <p className='game-pot'>{game.totalbet}</p>
              {/* <p>Minimum Bet: {game.minbet}</p> */}
              <div className='game-pick-selection'>
                <button
                  onClick={() => setPick('HEAD')}
                  style = {{
                    backgroundColor: pick === 'HEAD' ? 'black' : 'aliceblue',
                    color: pick === 'HEAD' ? 'aliceblue' : 'black'
                  }} 
                  className='game-pick-button'
                >
                  HEAD
                </button>
                <button 
                  onClick={() => setPick('TAIL')}
                  style = {{
                    backgroundColor: pick === 'TAIL' ? 'black' : 'aliceblue',
                    color: pick === 'TAIL' ? 'aliceblue' : 'black'
                  }} 
                  className='game-pick-button'
                >
                  TAIL
                </button>
              </div>
              <input
                className="game-bet-input"
                type="text"
                placeholder={"MIN BET: " + game.minbet}
                value={bet}
                onChange={handleInputChange}
              />
              <button className="game-bet-button" onClick={placeBet(game.id)} disabled={!pick || isNaN(bet)}>BET</button>
          </div>
      ))}
    </div>
    
  );
}

export default Games