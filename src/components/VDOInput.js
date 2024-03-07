import React, { useState } from 'react';

const VDOInput = ({ socket, team, name }) => {
    const [link, setLink] = useState('');

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleButtonClick = () => {
        if (link.includes('https://vdo.ninja/?')) {
            // Send link to server via socket emit
            socket.emit('startStream', {link, team, name});
        } else {
            alert('Invalid link. It should contain "https://vdo.ninja/?"');
        }
    };

    const handleCloseButtonClick = () => {
        // Close active stream on server
        socket.emit('closeStream');
    };

    return (
        <div>
            <input type="text" value={link} onChange={handleLinkChange} />
            <button onClick={handleButtonClick}>Start Stream</button>
            <button onClick={handleCloseButtonClick}>Close Stream</button>
        </div>
    );
};

export default VDOInput;
