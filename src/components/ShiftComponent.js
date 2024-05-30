import React, { useState } from 'react';

const ShiftComponent = ({socket}) => {
    const [leftDropdownValue, setLeftDropdownValue] = useState(1);
    const [upDropdownValue, setUpDropdownValue] = useState(1);

    const handleLeftButtonClick = () => {
        socket.emit("shift_left_right", {row: leftDropdownValue, direction: "left"})
    };

    const handleRightButtonClick = () => {
        socket.emit("shift_left_right", {row: leftDropdownValue, direction: "right"})
    };

    const handleUpButtonClick = () => {
        socket.emit("shift_up_down", {column: upDropdownValue, direction: "up"})
    };

    const handleDownButtonClick = () => {
        socket.emit("shift_up_down", {column: upDropdownValue, direction: "down"})
    };

    return (
        <div>
            <div>
                <label>Verschiebe Links/Rechts:</label>
                <select value={leftDropdownValue} onChange={(e) => setLeftDropdownValue(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
                <button onClick={handleLeftButtonClick}>Links</button>
                <button onClick={handleRightButtonClick}>Rechts</button>
            </div>
            <div>
                <label>Verschiebe Hoch/Runter:</label>
                <select value={upDropdownValue} onChange={(e) => setUpDropdownValue(Number(e.target.value))}>
                    {['A', 'B', 'C', 'D', 'E'].map((letter, index) => (
                        <option key={index} value={index + 1}>
                            {letter}
                        </option>
                    ))}
                </select>
                <button onClick={handleUpButtonClick}>Hoch</button>
                <button onClick={handleDownButtonClick}>Runter</button>
            </div>
        </div>
    );
};

export default ShiftComponent;
