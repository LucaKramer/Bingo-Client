import React from "react";

import { useEffect, useState } from "react";

import BingoTable from "../components/BingoTable";
import EventLog from "../components/EventLog";
import SelectColor from "../components/SelectColor";
import PlayerInfo from "../components/PlayerInfo";

const MainPage = ({ socket, updateTeam }) => {
    useEffect(() => {
        socket.on("receive_field", (data) => {
            alert(data.payload);
        });
    }, [socket]);

    const [playerInfo, setPlayerInfo] = useState({
        username: "None",
        team: "None",
    });

    const updateName = (newName) => {
        setPlayerInfo((prevPlayerInfo) => ({
            ...prevPlayerInfo,
            username: newName,
        }));
    };

    return (
        <div className="App">
            <SelectColor
                socket={socket}
                playerInfo={playerInfo}
                updateTeam={updateTeam}
            />
            <div className="row-container">
                <div className="div-box">
                    <PlayerInfo
                        socket={socket}
                        playerInfo={playerInfo}
                        updateName={updateName}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
