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
                <label>Left/Right Row: </label>
                <select value={leftDropdownValue} onChange={(e) => setLeftDropdownValue(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
                <button onClick={handleLeftButtonClick}>Left</button>
                <button onClick={handleRightButtonClick}>Right</button>
            </div>
            <div>
                <label>Up/Down Column:</label>
                <select value={upDropdownValue} onChange={(e) => setUpDropdownValue(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
                <button onClick={handleUpButtonClick}>Up</button>
                <button onClick={handleDownButtonClick}>Down</button>
            </div>
        </div>
    );
};

export default ShiftComponent;
