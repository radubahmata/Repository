import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const Square = (props) => {
    //const [value, setValue] = useState(null);
    
    return (
      <button 
          className="square" 
          onClick={props.onClick}
      >
      {props.value}
      </button>
      );
    
  }
  
  const Board = ()=> {
    
    const [squares, setSquares] = useState(Array(9).fill(null));
    /*constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
        };
    }
    */
    const handleClick = (i)=>{
      const squares_copy = squares.slice();
      squares_copy[i]='X';
      setSquares(squares_copy);
    }

    const renderSquare = (i) =>  {
      //var squareState=squares[i];
      return( 
        <Square 
          value={squares[i]}
          onClick={()=>handleClick(i)}
        />
      )
      
    }
  

    const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  