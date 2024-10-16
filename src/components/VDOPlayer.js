import React, { useEffect, useState } from 'react';

const VDOPlayer = ({ socket }) => {
    const [activeStreams, setActiveStreams] = useState([]);
    const [showBorder, setShowBorder] = useState(false);

    useEffect(() => {
        // Listen for active streams from the server
        socket.on('activeStreams', (streams) => {
            // Sort the streams by stream.team each time new data is received
            const sortedStreams = [...streams].sort((a, b) => {
                if (a.team < b.team) return -1;
                if (a.team > b.team) return 1;
                return 0;
            });
            setActiveStreams(sortedStreams);
        });

        return () => {
            // Clean up the socket listener when the component unmounts
            socket.off('activeStreams');
        };
    }, [socket]);

    const videoWidth = 285; // Adjust the individual video width
    const videoSpacing = 20; // Adjust the spacing between videos

    const viewerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px',
    };

    return (
        <div style={viewerStyle} key={JSON.stringify(activeStreams)}>
            {activeStreams.map((stream) => (
                <div key={stream.id} className="Viewer" style={{border: showBorder ? `2px solid ${stream.team}` : 'none', background: `${stream.team}`}}>
                    <p style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bolder',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '25px',
                        marginTop: '5px',
                        marginBottom: '5px'
                    }}>{stream.name}</p>
                    <div className="video-item">
                        <iframe
                            title={`Video Feed ${stream.name}`}
                            width={videoWidth}
                            height={(videoWidth * 9) / 16}
                            src={`${stream.link}&autoplay=1&muted=1`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VDOPlayer;
