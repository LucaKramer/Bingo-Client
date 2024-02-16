import React, { useEffect, useState } from 'react';
import 'typeface-roboto';

function Viewer({ socket, team, name }) {
    const [videoFrame, setVideoFrame] = useState('');
    const [showBorder, setShowBorder] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const handleVideoFrame = (frame) => {
            if (frame !== null) {
                const sanitizedFrame = frame.startsWith('data:image/jpeg;base64,')
                    ? frame.slice('data:image/jpeg;base64,'.length)
                    : frame;

                setVideoFrame(sanitizedFrame);
                setShowBorder(true); // Set showBorder to true when receiving video stream
            } else {
                console.warn("Received null frame.");
            }
        };

        const handleNameChange = (name) => {
            setUsername(name);
        }

        socket.on(`videoStream-${team}`, handleVideoFrame);
        socket.on(`nameChange-${team}`, handleNameChange)

        return () => {
            socket.off(`videoStream-${team}`, handleVideoFrame);
        };
    }, [socket, team]);

    const handleImageError = (e) => {
        console.error("Error loading image:", e.target.src, e);
    };

    return (
        <div className="Viewer" style={{ border: showBorder ? `2px solid ${team}` : 'none' , background: ` ${team}`}}>
            <p style={{textAlign: 'center', color: 'white', fontWeight: 'bolder', fontFamily: 'Roboto, sans-serif', fontSize: '50px', marginTop: '5px', marginBottom: '5px'}}>{username}</p>
            {videoFrame && (
                <img
                    src={`data:image/jpeg;base64,${videoFrame}`}
                    alt="Video Frame"
                    style={{ width: '854px', height: '480px', objectFit: 'cover' }}
                    onError={handleImageError}
                />
            )}
        </div>
    );
}

export default Viewer;
