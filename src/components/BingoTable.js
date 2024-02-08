import React, { useState, useEffect } from "react";

const BingoTable = ({ socket, playerInfo }) => {
    const [gameState, setGameState] = useState(
        Array.from({ length: 5 }, () =>
            Array(5).fill({
                coords: [],
                color: ["white"],
                pokemonImage: "",
                Name: "",
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
    }, [socket]);

    const sendField = (i, j) => {
        // Check if the player has a valid team before sending the field
        if (playerInfo.team !== "None") {
            socket.emit("send_field", { playerInfo, coords: [i, j] });
        }
    };

    const initial = () => {
        socket.emit("get_state");
    };

    const createTable = () => {
        const tableRows = [];
        for (let i = 0; i < 5; i++) {
            const rowCells = [];
            for (let j = 0; j < 5; j++) {
                const cellColors = gameState[i][j].color || ["white"];
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
                                    : "grey", // Set background to transparent if no colors
                            }}
                            onClick={() => sendField(i, j)}
                        >
                            <img
                                src={gameState[i][j].pokemonImage}
                                alt={gameState[i][j].Name}
                                width="100"
                            />
                        </button>
                    </td>
                );
            }
            tableRows.push(<tr key={`row-${i}`}>{rowCells}</tr>);
        }

        return (
            <table>
                <tbody>{tableRows}</tbody>
            </table>
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
