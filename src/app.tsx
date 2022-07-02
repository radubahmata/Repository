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
    const [xIsNext,setXIsNext] = useState(true);
    const [stepNumber, setStepNumber]=useState(0);

    const handleClick = (i:number)=>{
      setHistory(history.slice(0,stepNumber+1));
      const current = history[history.length-1];
      const squares=current.squares.slice();
      setHistory(history.concat([{squares: squares}]));
      
      if(calculateWinner(squares) || squares[i]){
        return;
      }
      
      squares[i]= xIsNext? 'X':'O';
      setHistory(history.concat([{squares:squares}]));
      setStepNumber(history.length);
      setXIsNext(!xIsNext);
      
    }

    function jumpTo(step:number){
      setStepNumber(step);
      setXIsNext((step%2) === 0);
    }
    
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move)=>{
      const desc = move?
      'Go to move #' + move:
      'Go to game start';
      return(
        <li key={move}>
          <button onClick={()=>jumpTo(move)}>{desc}</button>
        </li>
      )
    });

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
            <ol>{moves}</ol>
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