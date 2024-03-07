import React from "react";

import { useEffect, useState } from "react";

import BingoTable from "../components/BingoTable";
import ShiftComponent from "../components/ShiftComponent";

const Admin = ({ socket }) => {
    const [isCheckboxChecked, setCheckboxChecked] = useState(false);

    useEffect(() => {
        socket.on("receive_field", (data) => {
            alert(data.payload);
        });
    }, [socket]);

    const [playerInfo] = useState({
        username: "None",
        team: "None",
    });

    const update = () => {
        socket.emit("refresh_board", {withCheckbox: isCheckboxChecked});
    };

    const shuffle = () => {
        socket.emit("shuffle_board");
    };

    const handleCheckboxChange = () => {
        setCheckboxChecked(!isCheckboxChecked);
    };

    return (
        <div className="App">
            <input
                type="checkbox"
                id="includeCheckbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
            />
            <button className="refresh" onClick={() => update()}>
                Refresh Board
            </button>
            <button className="shuffle" onClick={() => shuffle()}>
                Shuffle Board
            </button>
            <ShiftComponent socket={socket}/>
            <div className="row-container">
                <BingoTable socket={socket} playerInfo={playerInfo}/>
            </div>
        </div>
    );
};

export default Admin;
