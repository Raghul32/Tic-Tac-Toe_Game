import Player from "./components/Player"
import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from './Winning-combination';
import { GameOver } from "./components/GameOver";

const PLAYERS = {
  "X" : "Player 1",
  "O" : "Player 2"
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';
  
    if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
    }
  
    return currentPlayer;
  }

  function deriveGameBoard(gameTurns){
    let gameBoard = [...initialGameBoard.map((array)=> [...array])];
  
      for ( const turn of gameTurns){
          const {square , player} = turn;
          const {row, col} = square;
          gameBoard[row][col] = player;
      }

      return gameBoard;
    
  }

  function deriveWinner(gameBoard , playerName){
    let winner;

    for (const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = playerName[firstSquareSymbol];
      }
    }
    return winner;
    
  }



function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS)
  
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  
  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex , colIndex){
    setGameTurns(prevTurns => {
      const activePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square : {row: rowIndex, col: colIndex}, player : activePlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerChangeName(symbol, newName){
    setPlayerName((prevPlayers)=>{
      return{
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }


  return (
    <main>
      <div id = "game-container">
        <ol id ="players" className="highlight-player">
          <Player initialName = {PLAYERS.X} symbol ="X" isActive={activePlayer === 'X'} onChangeName = {handlePlayerChangeName}/>
          <Player initialName = {PLAYERS.O} symbol ="O" isActive={activePlayer === 'O'} onChangeName = {handlePlayerChangeName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart = {handleRestart}/>}
        <GameBoard  onSelectSquare={handleSelectSquare} board = {gameBoard}/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
