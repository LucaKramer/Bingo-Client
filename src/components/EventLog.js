import React, { useState, useEffect } from "react";

const EventLog = ({ socket }) => {
    const [eventLog, setEventLog] = useState([]);

    useEffect(() => {
        // Listen for "recieve_event" events from the server
        socket.on("recieve_event", (data) => {
            // Update eventLog with the new event and keep only the last 10 events
            setEventLog((prevEventLog) => [...prevEventLog.slice(-9), data]);
        });

        // Clean up the socket event listener when the component is unmounted
        return () => {
            socket.off("recieve_event");
        };
    }, [socket]);

    return (
        <div>
            <h1>Event Log</h1>
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
