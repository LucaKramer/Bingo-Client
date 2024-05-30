import React, { useEffect } from "react";

const SoundPlayer = ({ socket }) => {
    useEffect(() => {
        const playSound = (data) => {
            const shiny = new Audio("sounds/shiny.mp3");
            const bingo = new Audio("sounds/bingo.mp3");
            shiny.volume = 0.2;
            bingo.volume = 0.1;

            shiny.onended = () => {
                if (data) {
                    bingo.play();
                }
            };
            shiny.play();
        };

        socket.on("play_sound", (data) => {
            playSound(data);
        });
    }, [socket]);

    return <div></div>;
};

export default SoundPlayer;
