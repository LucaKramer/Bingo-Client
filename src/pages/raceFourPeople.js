import React, {useEffect, useState} from "react";
import backgroundImage from "../Pokerogue_Race.png";
import RaceCamera from "../components/RaceCamera";
import RaceText from "../components/RaceText";


const RaceFourPeople = ({socket, arr}) => {
    const backgroundStyle = {
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "1080px",
        width: "1920px",
    };

    const game = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        transform: "scale(0.65)",
        alignItems: "center",
        marginRight: "-570px",
        top: "-150px",
        gap: "40px",
    };

    const opponents = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(0.215)",
        marginTop: "-730px",
        marginRight: "-575px",
        gap: "40px",
    };

    return (
        <div>
            <div style={backgroundStyle}>
                <div style={game}>
                    <div style={{border: "10px solid red", backgroundColor: "red"}}>
                        <RaceCamera socket={socket} eventString={`race-game${arr[0]}`}/>
                    </div>
                </div>
                <div style={opponents}>
                    <div>
                        <div style={{transform: "scale(15)", position: "relative", top: "-80px"}}>
                            <RaceText socket={socket} eventString={`race-name${arr[1]}`}/>
                        </div>
                        <div style={{border: "10px solid red", backgroundColor: "red"}}>
                            <RaceCamera socket={socket} eventString={`race-game${arr[1]}`}/>
                        </div>
                    </div>
                    <div>
                        <div style={{transform: "scale(15)", position: "relative", top: "-80px"}}>
                            <RaceText socket={socket} eventString={`race-name${arr[2]}`}/>
                        </div>
                        <div style={{border: "10px solid red", backgroundColor: "red"}}>
                            <RaceCamera socket={socket} eventString={`race-game${arr[2]}`}/>
                        </div>
                    </div>
                    <div>
                        <div style={{transform: "scale(15)", position: "relative", top: "-80px"}}>
                            <RaceText socket={socket} eventString={`race-name${arr[3]}`}/>
                        </div>
                        <div style={{border: "10px solid red", backgroundColor: "red"}}>
                            <RaceCamera socket={socket} eventString={`race-game${arr[3]}`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaceFourPeople;
