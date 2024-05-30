import React, {useEffect, useState} from "react";
import backgroundImage from "../Layout-Background.png";
import BingoTable from "../components/BingoTable";
import Viewer from "../components/Viewer";
import VDOPlayer from "../components/VDOPlayer";

const Board = ({socket}) => {
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
        marginLeft: "-70px", // Move 30px to the right
        top: "283px",
        width: "638px",
        transform: "scale(0.7)", // Scale down to 60%
        //border: "5px solid white",
    };

    const camera = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(1)",
        width: "100%",
        marginTop: "206px",
    };

    return (
        <div>
            <div style={backgroundStyle}>
                <div style={wrapperStyle}>
                    <BingoTable socket={socket} playerInfo={playerInfo}/>
                </div>
                <div className="camera" style={camera}>
                    <VDOPlayer socket={socket}/>
                </div>
            </div>
        </div>
    );
};

export default Board;
