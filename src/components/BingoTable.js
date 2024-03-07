import React, { useState, useEffect } from "react";

const BingoTable = ({ socket, playerInfo }) => {
    const [animationCoords, setAnimationCoords] = useState(null);
    const [isShinyAnimationActive, setIsShinyAnimationActive] = useState(false);

    const [gameState, setGameState] = useState(
        Array.from({ length: 5 }, () =>
            Array(5).fill({
                coords: [],
                states: { red: 0, blue: 0, orange: 0, green: 0, purple: 0 },
                pokemonImage: "",
                name: "",
                ball: "",
            })
        )
    );

    useEffect(() => {
        // Listen for initial game state from the server
        socket.on("initial_state", (initialState) => {
            setGameState(initialState);
        });

        socket.on("color_update", (data) => {
            gameState[data.coords[0]][data.coords[1]].color.push(
                data.playerInfo.team
            );
        });

        socket.on("shiny_animation", (data) => {
            const { coords, color } = data;
            setAnimationCoords({coords, color});
            setIsShinyAnimationActive(true);

            // Trigger animation by setting a temporary state
            setTimeout(() => {
                setAnimationCoords(null);
                setIsShinyAnimationActive(false);
            }, 4000); // Adjust the duration as needed
        });

    }, [socket, gameState]);

    const sendField = (i, j) => {
        // Check if the player has a valid team before sending the field
        if (playerInfo.team !== "None") {
            socket.emit("send_field", { playerInfo, coords: [i, j] });
        }
    };

    const initial = () => {
        socket.emit("get_state");
    };

    const stateColors = {
        red: 1,
        blue: 2,
        green: 3,
        orange: 4,
        purple: 5
    };

    const createTable = () => {
        const tableRows = [];
        const { coords, color } = animationCoords || {};
        for (let i = 0; i < 5; i++) {
            const rowCells = [];
            for (let j = 0; j < 5; j++) {
                const states = gameState[i][j].states;
                const cellColors = ["white"];
                const blocked = [];
                for (const state in states) {
                    if (states[state] === 1 && stateColors[state]) {
                        cellColors.push(state);
                    }else if (states[state] === 2 && stateColors[state]) {
                        blocked.push(state);
                    }
                }
                const hasColors = cellColors.length > 1;


                rowCells.push(
                    <td key={`cell-${i}-${j}`}>
                        <button
                            className={`BingoButton row-${i} col-${j}`}
                            style={{
                                background: hasColors
                                    ? `linear-gradient(to right, ${
                                        Array.isArray(cellColors)
                                            ? cellColors
                                                .filter((c) => c !== "white")
                                                .map(
                                                    (c, index, array) =>
                                                        `${c} ${index * (100 / array.length)}% ${
                                                            (index + 1) * (100 / array.length)
                                                        }%`
                                                )
                                                .join(", ")
                                            : ""
                                    })`
                                    : "rgba(128, 128, 128, 0.5)",
                                position: 'relative',
                                overflow: 'hidden',
                                transition: isShinyAnimationActive ? "background 1s ease-in-out" : "",
                            }}
                            onClick={() => sendField(i, j)}
                        >
                            <img
                                src={gameState[i][j].pokemonImage}
                                alt={gameState[i][j].name}
                                width="100"
                            />

                            {gameState[i][j].ball && (
                                <img
                                    style={{position: 'absolute', left: 35, bottom: 0, width: '35%', height: '35%', display: 'flex', justifyContent: 'center',
                                        alignItems: 'center', zIndex: 2}}
                                    src={gameState[i][j].ball}
                                    alt={gameState[i][j].name}
                                    width="40"
                                />
                            )}

                            {isShinyAnimationActive && coords && coords[0] === i && coords[1] === j && (
                                <img
                                    src="/sparkle.gif" // Replace with the correct path to your sparkle.gif file
                                    alt="sparkle"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 2,
                                    }}
                                />
                            )}

                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1
                            }}>
                                {blocked.map((color, index) => (
                                    <div
                                        key={`x-overlay-${i}-${j}-${color}`}
                                        className={`x-overlay`}
                                        style={{
                                            color: color,
                                            fontWeight: 'bold',
                                            fontSize: 30,
                                            position: 'absolute',
                                            ...(index === 0 && {
                                                left: 0,
                                                top: -10,
                                            }),
                                            ...(index === 1 && {
                                                right: 0,
                                                top: -10,
                                            }),
                                            ...(index === 2 && {
                                                left: 0,
                                                bottom: -7,
                                            }),
                                            ...(index === 3 && {
                                                right: 0,
                                                bottom: -7,
                                            }),
                                            ...(index === 4 && {
                                                position: 'relative',
                                                left: 0,
                                                top: 0,
                                            }),
                                        }}
                                    >
                                        &#10006;
                                    </div>
                                ))}
                            </div>

                        </button>
                    </td>
                );
            }
            tableRows.push(<tr key={`row-${i}`}>{rowCells}</tr>);
        }

        const animationStyle = {
            background: coords
                ? `${color} ${coords[0] * 20}% ${coords[1] * 20}%`
                : "none",
            transition: "background 1s ease-in-out, opacity 0.8s ease-in-out",
        };

        return (
            <div className="BingoTable" style={animationStyle}>
                <table>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {initial()}
            {createTable()}
        </div>
    );
};

export default BingoTable;
