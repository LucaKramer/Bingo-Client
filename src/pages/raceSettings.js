import React, {useEffect, useState} from "react";

const RaceSettings = ({socket}) => {
    const [link1, setLink1] = useState('');
    const [link2, setLink2] = useState('');
    const [link3, setLink3] = useState('');
    const [link4, setLink4] = useState('');
    const [link5, setLink5] = useState('');
    const [link6, setLink6] = useState('');
    const [link7, setLink7] = useState('');
    const [link8, setLink8] = useState('');
    const [link9, setLink9] = useState('');
    const [link10, setLink10] = useState('');
    const [link11, setLink11] = useState('');
    const [link12, setLink12] = useState('');

    const handleLink1Change = (event) => {
        setLink1(event.target.value);
    };

    const handleLink2Change = (event) => {
        setLink2(event.target.value);
    };

    const handleLink3Change = (event) => {
        setLink3(event.target.value);
    };

    const handleLink4Change = (event) => {
        setLink4(event.target.value);
    };

    const handleLink5Change = (event) => {
        setLink5(event.target.value);
    };

    const handleLink6Change = (event) => {
        setLink6(event.target.value);
    };

    const handleLink7Change = (event) => {
        setLink7(event.target.value);
    };

    const handleLink8Change = (event) => {
        setLink8(event.target.value);
    };

    const handleLink9Change = (event) => {
        setLink9(event.target.value);
    };

    const handleLink10Change = (event) => {
        setLink10(event.target.value);
    };

    const handleLink11Change = (event) => {
        setLink11(event.target.value);
    };

    const handleLink12Change = (event) => {
        setLink12(event.target.value);
    };

    const handleButtonClick = () => {
        socket.emit('race-streams', {link1, link2, link3, link4, link5, link6, link7, link8, link9, link10, link11, link12});
    };

    const handleCloseButtonClick = () => {
        // Close active stream on server
        socket.emit('race-endStreams');
    };

    return (
        <div>
            <div>
                <p>Cam 1</p><input type="text" value={link1} onChange={handleLink1Change}/>
                <p>Cam 2</p><input type="text" value={link2} onChange={handleLink2Change}/>
                <p>Cam 3</p><input type="text" value={link3} onChange={handleLink3Change}/>
                <p>Cam 4</p><input type="text" value={link4} onChange={handleLink4Change}/>
            </div>
            <div>
                <p>Game 1</p><input type="text" value={link5} onChange={handleLink5Change}/>
                <p>Game 2</p><input type="text" value={link6} onChange={handleLink6Change}/>
                <p>Game 3</p><input type="text" value={link7} onChange={handleLink7Change}/>
                <p>Game 4</p><input type="text" value={link8} onChange={handleLink8Change}/>
            </div>
            <div>
                <p>Name 1</p><input type="text" value={link9} onChange={handleLink9Change}/>
                <p>Name 2</p><input type="text" value={link10} onChange={handleLink10Change}/>
                <p>Name 3</p><input type="text" value={link11} onChange={handleLink11Change}/>
                <p>Name 4</p><input type="text" value={link12} onChange={handleLink12Change}/>
            </div>
            <button onClick={handleButtonClick}>Start Stream</button>
            <button onClick={handleCloseButtonClick}>Close Stream</button>
        </div>
    );
};

export default RaceSettings;
