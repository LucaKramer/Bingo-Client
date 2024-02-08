import React from "react";

import { useEffect, useState } from "react";

import BingoTable from "../components/BingoTable";

const Admin = ({ socket }) => {
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
        socket.emit("refresh_board");
    };

    const shuffle = () => {
        socket.emit("shuffle_board");
    };

    return (
        <div className="App">
            <button className="refresh" onClick={() => update()}>
                Refresh Board
            </button>
            <button className="shuffle" onClick={() => shuffle()}>
                Shuffle Board
            </button>
            <div className="row-container">
                <BingoTable socket={socket} playerInfo={playerInfo} />
            </div>
        </div>
    );
};

export default Admin;
