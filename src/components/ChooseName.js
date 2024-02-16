import React, { useState } from "react";

const ChooseName = ({ setPlayerName }) => {
    const [name, setName] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = () => {
        if (name.trim() !== "") {
            setPlayerName(name.trim());
        } else {
            alert("Please enter a valid name."); // You can replace this with a more sophisticated validation or UI feedback
        }
    };

    return (
        <div>
            <label>
                Enter your name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ChooseName;
