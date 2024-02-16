import React from "react";
import VideoSender from "../components/VideoSender";

const Board = ({ socket, team}) => {


    return (
        <div>
            <VideoSender socket={socket} team={team} />
        </div>

    );
};

export default Board;
