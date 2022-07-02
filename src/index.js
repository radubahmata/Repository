import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
function Square(props){
    return (
      <button 
          className="square" 
          onClick={()=>props.onClick()}
      >
      {props.value}
      </button>
      );
    
  }
  
  const Board = (props)=> {
    
    //const [squares, setSquares] = useState(Array(9).fill(null));
    
    /*constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
        };
    }
    */
    
    
    const renderSquare = (i) =>  {
      //var squareState=squares[i];
      return( 
        <Square 
          value={props.squares[i]}
          onClick={()=>props.onClick(i)}
        />
      )
      
    }
  

    //const status = 'Next player: ' + (xIsNext? 'X':'O');

    
  
      return (
        <div>
          <div className="status">{props.status}</div>
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
  
  
  const Game =()=> {
    const[history, setHistory] = useState([{squares:Array(9).fill(null)}]);
    const [xIsNext, setXIsNext] = useState(true);
    

    setHistory(history);
    setXIsNext(true);
    const current = history[history.length-1];
    const handleClick = (i)=>{
      
      setHistory(history);
      const current = history[history.length-1];
      console.log(current);
      const squares_copy = current.squares.slice();
      if(calculateWinner(squares_copy) || squares_copy[i]){
        return;
      }
      
      squares_copy[i]= xIsNext? 'X':'O';

      setHistory(history.concat([{squares:squares_copy}]));

      //setSquares(squares_copy);
      setXIsNext(!xIsNext);
    }

    //const winner = calculateWinner(current.squares.slice());
    const winner=null;
    let status;
    if(winner){
      status='Winner: '+winner;
    }else {
      status='Next player: ' + (xIsNext? 'X':'O');
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i)=>handleClick(i)}
              status={status}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
  }

  function calculateWinner(squares){
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
    console.log('winner');
    for(let i=0; i<lines.length;i++){
      
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  