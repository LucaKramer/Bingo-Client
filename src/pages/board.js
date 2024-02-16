import React from "react";

import backgroundImage from "../Layout-Background.png";

import { useEffect, useState } from "react";

import BingoTable from "../components/BingoTable";
import Viewer from "../components/Viewer";

const Board = ({ socket }) => {
    useEffect(() => {
        socket.on("receive_field", (data) => {
            alert(data.payload);
        });
    }, [socket]);

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "1080px",
        width: "1920px"
    };

    const [playerInfo] = useState({
        username: "None",
        team: "None",
    });

    const wrapperStyle = {
        position: "relative",
        marginLeft: "-40px",   // Move 30px to the right
        top: "313px",
        width: "582px",
        transform: "scale(0.75)",   // Scale down to 60%
        border: "5px solid white",
    };

    const camera = {
        display: "flex",
        justifyContent: "space-between",
        transform: "scale(0.425)",
        maxWidth: "1920px",
        marginLeft: "-542px",
        marginTop: "100px",
    }

    return (
        <div>
            <div style={backgroundStyle}>
                <div style={wrapperStyle}>
                    <BingoTable socket={socket} playerInfo={playerInfo}/>
                </div>
                <div className="camera" style={camera}>
                    <Viewer socket={socket} team={"red"}/>
                    <Viewer socket={socket} team={"blue"}/>
                    <Viewer socket={socket} team={"green"}/>
                    <Viewer socket={socket} team={"orange"}/>
                    <Viewer socket={socket} team={"purple"}/>
                </div>
            </div>
        </div>

    );
};

export default Board;
