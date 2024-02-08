import React, { useEffect } from "react";

const SoundPlayer = ({ socket }) => {
    useEffect(() => {
        const playSound = () => {
            const audio = new Audio("sounds/blue.mp3");
            audio.volume = 0.2;
            audio.play();
        };

        socket.on("play_sound", (data) => {
            playSound();
        });
    }, [socket]);

    return <div></div>;
};

export default SoundPlayer;
