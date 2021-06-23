


const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState('blue')
  const [status, setStatus] = React.useState(null);
  
  const xo = ["O", "X"];

  //Tracks the state of squares
  return (
    <button onClick ={(e)=>{
      if (status === null){
        let nextPlayer = newState({id:id, color:color});
        setStatus(player);
        let colors = ['blue', 'red']
        e.target.style.background = colors[(player + 1) % 2];  
        if (player === 1 ){
          playerX_ids.push(id)
          console.log(playerX_ids + "Player X")
        }

        if (player === 0){
          playerO_ids.push(id)
          console.log(playerO_ids + "Player O")
        }

        checkforwinner();

      }  
      
      
    }} >
      <h1>
        {xo[status]} 
      </h1> 
    </button>
  )
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState([]);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);

  //Set Status
  let current_player = player == '0' ? 'O': 'X';
  let status = `Player: ${current_player}`;

  // Define newState function
  const newState = (obj) => {
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    setState([...state, obj]);
    //console.log(`adding state ${JSON.stringify(state)}`)
    
  }

  const toggle = ()=> {setMounted(!mounted)
    //Clear Player_IDs
    playerX_ids = [];
    playerO_ids = [];};
    


  function renderSquare(i) {
    
    return <Square id={i} player={player} newState={newState}></Square>;
  }

  return (
    <div className="game-board">

      <div className = "grid-row">
      {mounted && renderSquare(0)}
      {mounted && renderSquare(1)}
      {mounted && renderSquare(2)}
      </div>
      <div className = "grid-row">
      {mounted && renderSquare(3)}
      {mounted && renderSquare(4)}
      {mounted && renderSquare(5)}
      </div>
      <div className = "grid-row">
      {mounted && renderSquare(6)}
      {mounted && renderSquare(7)}
      {mounted && renderSquare(8)}
      </div>
        
      <div id="info">
        <h1>{status}</h1>
        <h1>{winner}</h1>
        <button onClick={toggle}>Refresh Board</button>
      </div>


    </div>
  );
};

//Checking for the winner
var playerX_ids = [];
var playerO_ids = [];
var winner = "Winner: ";
const winning_combos = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],

];

function checkforwinner(){
  for(let i=0; i<winning_combos.length; i++){

    
    if(
      playerX_ids.includes(winning_combos[i][0]) &&
      playerX_ids.includes(winning_combos[i][1]) &&
      playerX_ids.includes(winning_combos[i][2]) 
      ){
      console.log("Player X Wins!")
      return winner = "Winner: Player X"
    }

    if(
      playerO_ids.includes(winning_combos[i][0]) &&
      playerO_ids.includes(winning_combos[i][1]) &&
      playerO_ids.includes(winning_combos[i][2]) 
      ){
      console.log("Player O Wins!")
      return winner = "Winner: Player O"
    }
  }
}



// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
