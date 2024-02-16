import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SelectColor from "./components/SelectColor";
import PlayerInfo from "./components/PlayerInfo";

import Index from "./pages/index";
import Board from "./pages/board";
import Game from "./pages/game";
import Admin from "./pages/admin";
import Video from "./pages/video";

//const socket = io.connect("http://167.235.177.240:7777", {});
const socket = io.connect("http://localhost:7777", {reconnection: true});

function App() {
  useEffect(() => {
    socket.on("receive_field", (data) => {
      alert(data.payload);
    });
  });

  const [playerInfo, setPlayerInfo] = useState({
    username: "None",
    team: "None",
  });

  const updateTeam = (newTeam) => {
    setPlayerInfo((prevPlayerInfo) => ({
      ...prevPlayerInfo,
      team: newTeam,
    }));
  };

  const updateName = (newName) => {
    setPlayerInfo((prevPlayerInfo) => ({
      ...prevPlayerInfo,
      username: newName,
    }));
  };

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route
                path="/"
                element={
                  <div>
                    <SelectColor
                        socket={socket}
                        playerInfo={playerInfo}
                        updateTeam={updateTeam}
                    />
                    <PlayerInfo
                        socket={socket}
                        playerInfo={playerInfo}
                        updateName={updateName}
                    />
                  </div>
                }
            />
            <Route path="/index" element={<Index socket={socket} />} />
            <Route path="/board" element={<Board socket={socket} />} />
            <Route path="/red" element={<Video socket={socket} team={`red`} />} />
            <Route path="/blue" element={<Video socket={socket} team={"blue"} />} />
            <Route path="/green" element={<Video socket={socket} team={"green"} />} />
            <Route path="/orange" element={<Video socket={socket} team={"orange"} />} />
            <Route path="/purple" element={<Video socket={socket} team={"purple"} />} />
            <Route
                path="/game"
                element={
                  <Game
                      socket={socket}
                      playerInfo={playerInfo}
                      updateName={updateName}
                  />
                }
            />
            <Route path="/admin" element={<Admin socket={socket} />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
