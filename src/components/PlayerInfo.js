import React, { useState } from "react";

const PlayerInfo = ({ socket, playerInfo, updateName }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const changeName = () => {
        socket.emit("change_username", { playerInfo, inputValue });
        updateName(inputValue);
        const team = playerInfo.team;
        const name = inputValue;
        socket.emit(`nameChange`, {name, team});
    };

    return (
        <div>
            <h1>Player Info</h1>
            <p>Username: {playerInfo.username}</p>
            <p>Team: {playerInfo.team}</p>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="New username"
            />
            <button className="changeUsername" onClick={() => changeName()}>
                Change Name
            </button>
        </div>
    );
};

export default PlayerInfo;
