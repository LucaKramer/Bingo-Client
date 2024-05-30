import React, { useEffect, useState } from 'react';

const RaceText = ({ socket, eventString }) => {
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        const handleSocketEvent = (link) => {
            setIframeSrc(link);
        };

        socket.on(eventString, handleSocketEvent);

        // Cleanup on component unmount
        return () => {
            socket.off(eventString, handleSocketEvent);
        };
    }, [socket, eventString]);

    return (
        <div>
            <p style={{
                color: 'white',
                fontWeight: 'bolder',
                fontFamily: 'Roboto, sans-serif'
            }}>
                {iframeSrc}
            </p>
        </div>
    );
};

export default RaceText;
