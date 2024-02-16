import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

function VideoSender({ socket, team, name }) {
    const webcamRef = useRef(null);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        let videoStreamInterval;

        const sendVideoFrame = () => {
            const frame = webcamRef.current.getScreenshot();
            socket.emit(`videoStream`, {frame, team});
        };

        if (isSending) {
            videoStreamInterval = setInterval(sendVideoFrame, 1000 / 30); // Adjust the frame rate as needed
        }

        return () => {
            clearInterval(videoStreamInterval);
        };
    }, [socket, isSending, team, name]);

    const handleStartSending = () => {
        setIsSending(true);
    };

    const handleStopSending = () => {
        setIsSending(false);
    };

    return (
        <div className="VideoSender">
            <Webcam
                audio={false}
                height={480}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={854}
            />
            <div>
                <button onClick={handleStartSending}>Start Sending</button>
                <button onClick={handleStopSending}>Stop Sending</button>
            </div>
        </div>
    );
}

export default VideoSender;
