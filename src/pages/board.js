import React from "react";

import { useEffect, useState } from "react";

import BingoTable from "../components/BingoTable";

const MainPage = ({ socket }) => {
    useEffect(() => {
        socket.on("receive_field", (data) => {
            alert(data.payload);
        });
    }, [socket]);

    const [playerInfo] = useState({
        username: "None",
        team: "None",
    });

    return (
        <div className="App">
            <BingoTable socket={socket} playerInfo={playerInfo} />
        </div>
    );
};

export default MainPage;
