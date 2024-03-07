import React from "react";

import {useEffect} from "react";

import BingoTable from "../components/BingoTable";
import EventLog from "../components/EventLog";
import PlayerInfo from "../components/PlayerInfo";
import SoundPlayer from "../components/SoundPlayer";
import GameInfo from "../components/GameInfo";
import VideoSender from "../components/VideoSender";
import VDOInput from "../components/VDOInput";

const MainPage = ({socket, playerInfo, updateName}) => {
    useEffect(() => {
        socket.on("receive_field", (data) => {
            alert(data.payload);
        });
    }, [socket]);

    return (
        <div className="App">
            <div className="row-container">
                <div className="div-box">
                    <PlayerInfo
                        socket={socket}
                        playerInfo={playerInfo}
                        updateName={updateName}
                    />
                </div>
                <BingoTable socket={socket} playerInfo={playerInfo}/>
                <div className="div-box">
                    <EventLog socket={socket}/>
                </div>
                <VDOInput socket={socket} team={playerInfo.team} name={playerInfo.username} />
            </div>
            <SoundPlayer socket={socket}/>
        </div>
    );
};

//<div className="div-box">
//                 <GameInfo socket={socket} />
//             </div>
//<VideoSender socket={socket} team={playerInfo.team} name={playerInfo.username} />

export default MainPage;
