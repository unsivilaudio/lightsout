import React from 'react';
import Cell from '../components/Cell';
import '../assets/stylesheets/board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends React.Component {
    static defaultProps = { nRows: 5, nCols: 5 };

    state = { hasWon: false, board: [] };

    componentDidMount() {
        this.resetGameBoard();
    }

    resetGameBoard = () => {
        this.setState(prevState => ({
            ...prevState,
            board: this.createBoard(),
            hasWon: false,
        }));
    };

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    createBoard() {
        let board = [];
        for (let x = 0; x < this.props.nRows; x++) {
            const row = [];
            for (let y = 0; y < this.props.nCols; y++) {
                const initialState = Math.random();
                if (initialState > 0.5) {
                    row.push(true);
                } else {
                    row.push(false);
                }
            }
            board.push(row);
        }
        // TODO: create array-of-arrays of true/false values
        return board;
    }

    /** handle changing a cell: update board & determine if winner */

    flipCellsAround = coord => {
        let { nCols, nRows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split('-').map(Number);

        function flipCell(y, x) {
            // if this coord is actually on board, flip it

            if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
                board[y][x] = !board[y][x];
            }
        }

        // TODO: flip this cell and the cells around it
        const boardState = [];
        const updatedBoard = board.map((row, r) => {
            const updatedRow = row.map((col, c) => {
                if (
                    (r === x && c === y) ||
                    ((r === x + 1 || r === x - 1) && c === y) ||
                    ((c === y + 1 || c === y - 1) && r === x)
                ) {
                    return !col;
                }
                return col;
            });
            boardState.push(updatedRow.every(el => el === false));
            return updatedRow;
        });
        const hasWon = boardState.every(row => row === true);
        // win when every cell is turned off
        // TODO: determine is the game has been won

        this.setState(prevState => ({
            ...prevState,
            board: updatedBoard,
            hasWon,
        }));
    };

    /** Render game board or winning message. */

    renderGameBoard = () => {
        return this.state.board.map((row, x) => {
            return (
                <tr key={x}>
                    {row.map((col, y) => {
                        return (
                            <Cell
                                key={`${x}-${y}-${col}`}
                                isLit={col}
                                flipCellsAroundMe={() =>
                                    this.flipCellsAround(`${y}-${x}`)
                                }
                            />
                        );
                    })}
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <h1>This is the board component</h1>
                <table className='Board'>
                    <tbody>{this.renderGameBoard()}</tbody>
                </table>
            </div>
        );
        // if the game is won, just show a winning msg & render nothing else
        // TODO
        // make table board
        // TODO
    }
}

export default Board;
