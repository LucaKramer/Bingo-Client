import React from "react";

import backgroundImage from "../Layout-Background.png";

import { useEffect, useState } from "react";

import BingoTable from "../components/BingoTable";

const MainPage = ({ socket }) => {
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
        marginLeft: "-240px",   // Move 30px to the right
        top: "313px",
        transform: "scale(0.75)",   // Scale down to 60%
        // Add more styles as needed
    };

    return (
        <div style={backgroundStyle}>
            <div style={wrapperStyle}>
                <BingoTable socket={socket} playerInfo={playerInfo}/>
            </div>
        </div>
    );
};

export default MainPage;
