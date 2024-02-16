import React, { useEffect, useState } from "react";
import backgroundImage from "../Layout-Background.png";
import BingoTable from "../components/BingoTable";
import Viewer from "../components/Viewer";

const Board = ({ socket }) => {
    const [playerInfo] = useState({
        username: "None",
        team: "None",
    });

    const [activeTeams, setActiveTeams] = useState([]);

    useEffect(() => {
        socket.on("receive_field", (data) => {
            alert(data.payload);
        });

        // Listen for active teams and update state
        socket.on("activeTeams", (data) => {
            setActiveTeams(data.activeTeams);
        });

        return () => {
            socket.off("receive_field");
            socket.off("activeTeams");
        };
    }, [socket]);

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "1080px",
        width: "1920px",
    };

    const wrapperStyle = {
        position: "relative",
        marginLeft: "-40px", // Move 30px to the right
        top: "313px",
        width: "602px",
        transform: "scale(0.75)", // Scale down to 60%
        border: "5px solid white",
    };

    const camera = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(0.425)",
        width: "100%",
        marginTop: "100px",
        gap: "30px",
    };

    return (
        <div>
            <div style={backgroundStyle}>
                <div style={wrapperStyle}>
                    <BingoTable socket={socket} playerInfo={playerInfo} />
                </div>
                <div className="camera" style={camera}>
                    {activeTeams.map((team) => (
                        <Viewer key={team} socket={socket} team={team} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Board;
