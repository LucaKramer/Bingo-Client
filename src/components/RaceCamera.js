import React, { useEffect, useState } from 'react';

const RaceVideo = ({ socket, eventString }) => {
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
                <iframe
                    src={iframeSrc}
                    title="Race Video"
                    width="1920"
                    height="1080"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
        </div>
    );
};

export default RaceVideo;
