import { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditPlayer() {
        setIsEditing(editing => !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name" >{playerName}</span>

    if(isEditing){
        editablePlayerName = <input type="text" value={playerName} onChange={handleChange}></input>
    }

 return (
            <li className= {isActive? 'active' : undefined}>
                <span className="player" >
                {editablePlayerName}
                <span className="player-symbol" >{symbol}</span>
                </span>
                <button onClick={handleEditPlayer}>{isEditing ? "save" : "Edit"}</button>
            </li>
    );
}

export default Player;