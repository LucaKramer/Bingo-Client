import React, { useState, useEffect } from "react";

const GameInfo = ({ socket }) => {
    const [playerInfo, setPlayerInfo] = useState([]);

    useEffect(() => {
        // Listen for "recieve_event" events from the server
        socket.on("update_info", (players) => {
            // Update eventLog with the new event and keep only the last 10 events

        });

        // Clean up the socket event listener when the component is unmounted
        return () => {
            socket.off("recieve_event");
        };
    }, [socket]);

    return (
        <div>
            <h1>Team Info</h1>
            {eventLog
                .slice()
                .reverse()
                .map((event, index) => (
                    <p key={index} style={{ textAlign: "left" }}>
                        {event}
                    </p>
                ))}
        </div>
    );
};

export default EventLog;
