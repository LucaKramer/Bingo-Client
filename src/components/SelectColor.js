import React from "react";
import { useNavigate } from "react-router-dom";

const SelectColor = ({ socket, updateTeam, playerInfo }) => {
    const navigate = useNavigate();

    const sendTeam = (color) => {
        const updatedPlayerInfo = { ...playerInfo, team: color };
        socket.emit("change_team", { playerInfo, color });
        updateTeam(color);
        navigate("/game", { state: { playerInfo: updatedPlayerInfo } });
    };

    return (
        <div>
            <h1>Select Color</h1>
            <button className="buttonTeamRed" onClick={() => sendTeam("red")}>
                Red
            </button>
            <button className="buttonTeamBlue" onClick={() => sendTeam("blue")}>
                Blue
            </button>
            <button className="buttonTeamGreen" onClick={() => sendTeam("green")}>
                Green
            </button>
            <button className="buttonTeamYellow" onClick={() => sendTeam("yellow")}>
                Yellow
            </button>
            <button className="buttonTeamPurple" onClick={() => sendTeam("purple")}>
                Purple
            </button>
        </div>
    );
};

export default SelectColor;
