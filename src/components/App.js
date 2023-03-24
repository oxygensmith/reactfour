import React from 'react';
import Header from './Header';

const ROWS = 6;
const COLS = 7;

class App extends React.Component {

  constructor(props) {
    super(props);

    // Initialize the game board to all nulls
    const board = Array(ROWS).fill().map(() => Array(COLS).fill(null));

    this.state = {
      board: board,
      player1: true, // true if it's player 1's turn, false if it's player 2's turn
    };
  }

  handleClick(col) {
    // Find the lowest empty row in the selected column
    for (let row = ROWS - 1; row >= 0; row--) {
      if (this.state.board[row][col] === null) {
        // Place the piece in the lowest available row
        const board = this.state.board.slice();
        board[row][col] = this.state.player1 ? 'X' : 'O';
        this.setState({
          board: board,
          player1: !this.state.player1,
        });
        return;
      }
    }
  }

  render() {

    const cells = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        cells.push(
          <div
            className="cell"
            key={row * COLS + col}
            onClick={() => this.handleClick(col)}
            style={{backgroundColor: this.state.board[row][col] ?
              (this.state.board[row][col] === 'X' ? 'red' : 'yellow') : 'white'
            }}
          >
            <img src="images/cell.svg" />
          </div>
        );
      }
    }

    return (
        <div>
            <Header />
            <div className="board">
                {cells}
            </div>
        </div>
    )
  }
}

export default App;
