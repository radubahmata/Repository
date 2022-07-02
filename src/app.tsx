import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
interface SquareProps{
  onClick:()=>void;
  value:string;
}

interface BoardProps{
  squares:Array<string>;
  onClick:(i:number)=>void;
}

function Square(props:SquareProps){
    return (
      <button 
          className="square" 
          onClick={props.onClick}
      >
      {props.value}
      </button>
      );
    
  }
  
  const Board = (props:BoardProps)=> {

    const renderSquare = (i:number) =>  {
      return( 
        <Square 
          value={props.squares[i]}
          onClick={()=>props.onClick(i)}
        />
      )      
    }

      return (
        <div>
          
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
    }
  
  
  export const Game =()=> {
    let squares:Array<string>;
    const [history, setHistory] = useState([{squares:Array(9).fill(null)}]);
    console.log(history);
    const [xIsNext,setXIsNext] = useState(true);

    const handleClick = (i:number)=>{
      setHistory(history);
      const current = history[history.length-1];
      const squares_copy=current.squares.slice();
      setHistory(history.concat([{squares: squares_copy}]));
      
      if(calculateWinner(squares_copy) || squares_copy[i]){
        return;
      }
      
      squares_copy[i]= xIsNext? 'X':'O';
      setHistory(history.concat([{squares:squares_copy}]));
      setXIsNext(!xIsNext);
      
    }

    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i)=>handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
        
      );
      
  }

  function calculateWinner(squares:Array<String>){
    const lines =[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for(let j=0; j<lines.length;j++){
      const [a,b,c] = lines[j];
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
      }
    }
    return null;
  }