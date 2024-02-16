import React, { useState, useEffect } from "react";

const GameInfo = ({ socket }) => {
    const [teams, setTeams] = useState({
        red: [],
        blue: [],
        green: [],
        orange: [],
        purple: [],
    });

    useEffect(() => {
        socket.on("update_players", (data) => {
            // Update the state with the new player information
            console.log(data);
            const updatedTeams = {
                red: [],
                blue: [],
                green: [],
                orange: [],
                purple: [],
            };

            data.forEach((player) => {
                if(player.team != null) {
                    updatedTeams[player.team.toLowerCase()].push(player.name);
                }
            });

            setTeams(updatedTeams);
        });

        // Clean up the socket event listener when the component is unmounted
        return () => {
            socket.off("update_players");
        };
    }, [socket]);


    return (
        <div>
            <h1>Team Info</h1>
            <table>
                <tbody>
                <tr>
                    <td><h2>Red</h2></td>
                    <td><h2>Blue</h2></td>
                    <td><h2>Green</h2></td>
                    <td><h2>Orange</h2></td>
                    <td><h2>Purple</h2></td>
                </tr>
                <tr>
                    <td>{teams.red.join(', ')}</td>
                    <td>{teams.blue.join(', ')}</td>
                    <td>{teams.green.join(', ')}</td>
                    <td>{teams.orange.join(', ')}</td>
                    <td>{teams.purple.join(', ')}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GameInfo;
