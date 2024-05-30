import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SelectColor from "./components/SelectColor";
import PlayerInfo from "./components/PlayerInfo";

import VDOPlayer from "./components/VDOPlayer";
import VDOInput from "./components/VDOInput";

import Landing from "./pages/landing";
import Index from "./pages/index";
import Board from "./pages/board";
import Game from "./pages/game";
import Admin from "./pages/admin";
import Video from "./pages/video";
import Notfall from "./pages/notfall";
import Friends from "./pages/friends";
import Race from "./pages/race"
import RaceSettings from "./pages/raceSettings"
import RaceFourPeople from "./pages/raceFourPeople";

const socket = io("https://shinydust.de:7777", {
  transports: ["websocket"]
});

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
            <Route path="/" element={<Landing/>} />
            <Route path="/streamerbingo" element={<Index socket={socket} updateTeam={updateTeam} />} />
            <Route path="/friends" element={<Friends socket={socket} updateTeam={updateTeam} />} />
            <Route path="/index" element={<Index socket={socket} />} />
            <Route path="/board" element={<Board socket={socket} />} />
            <Route path="/notfall" element={<Notfall socket={socket} />} />
            <Route path="/red" element={<Video socket={socket} team={`red`} />} />
            <Route path="/blue" element={<Video socket={socket} team={"blue"} />} />
            <Route path="/green" element={<Video socket={socket} team={"green"} />} />
            <Route path="/orange" element={<Video socket={socket} team={"orange"} />} />
            <Route path="/purple" element={<Video socket={socket} team={"purple"} />} />
            <Route path="/race" element={<Race socket={socket} />} />
            <Route path="/raceSettings" element={<RaceSettings socket={socket} />} />
            <Route path="/raceFourPeople1" element={<RaceFourPeople socket={socket} arr={[1, 2, 3, 4]} />} />
            <Route path="/raceFourPeople2" element={<RaceFourPeople socket={socket} arr={[2, 1, 3, 4]} />} />
            <Route path="/raceFourPeople3" element={<RaceFourPeople socket={socket} arr={[3, 1, 2, 4]} />} />
            <Route path="/raceFourPeople4" element={<RaceFourPeople socket={socket} arr={[4, 1, 2, 3]} />} />
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
