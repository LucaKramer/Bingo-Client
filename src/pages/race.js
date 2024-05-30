import React, {useEffect, useState} from "react";
import backgroundImage from "../Race-Background.png";
import RaceCamera from "../components/RaceCamera";


const Race = ({socket}) => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "1080px",
        width: "1920px",
    };

    const camera = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(0.6)",
        gap: "1150px",
    };

    const game = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(0.95)",
        marginTop: "-10px",
        gap: "40px",
    };

    return (
        <div>
            <div style={backgroundStyle}>
                <div style={camera}><RaceCamera socket={socket} eventString={"race-camera1"}/> <RaceCamera socket={socket} eventString={"race-camera2"}/></div>
                <div style={game}><RaceCamera socket={socket} eventString={"race-game1"}/> <RaceCamera socket={socket} eventString={"race-game2"}/></div>
            </div>
        </div>
    );
};

export default Race;
