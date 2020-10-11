import React from 'react';
import Cell from '../components/Cell';
import '../assets/stylesheets/board.css';
import Modal from '../components/ui/Modal';
import Counter from '../components/Counter';

class Board extends React.Component {
    static defaultProps = { nRows: 5, nCols: 5 };

    state = {
        hasWon: false,
        board: [],
        showModal: false,
        nMoves: 0,
        nTime: 0,
    };

    componentDidMount() {
        this.resetGameBoard();
    }

    componentDidUpdate() {
        if (this.state.hasWon && !this.state.showModal) {
            this.setState(prevState => ({ ...prevState, showModal: true }));
        }
    }

    resetGameBoard = () => {
        this.setState(prevState => ({
            ...prevState,
            board: this.createBoard(),
            hasWon: false,
            showModal: false,
            nMoves: 0,
            nTime: 0,
        }));
    };

    handleCounterChange = count => {
        this.setState(prevState => ({ ...prevState, nTime: count }));
    };

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
        return board;
    }

    flipCellsAround = coord => {
        let board = this.state.board;
        let [y, x] = coord.split('-').map(Number);

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

        this.setState(prevState => ({
            ...prevState,
            board: updatedBoard,
            hasWon,
            nMoves: prevState.nMoves + 1,
        }));
    };

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

    getReadableTime = () => {
        const minutes = (Math.floor(this.state.nTime / 60) + 100)
            .toString()
            .split('')
            .splice(1)
            .join('');

        const seconds = ((this.state.nTime % 60) + 100)
            .toString()
            .split('')
            .splice(1)
            .join('');
        return `${minutes}:${seconds}`;
    };

    render() {
        return (
            <>
                <Modal
                    show={this.state.showModal}
                    clicked={this.resetGameBoard}>
                    <div className='ModalContent'>
                        <h1>Congratulations! You Did it!</h1>
                        <p>
                            You finished the game in{' '}
                            <span>{this.state.nMoves}</span> moves, in a time of{' '}
                            <span>{this.getReadableTime()}</span>
                        </p>
                        <button onClick={this.resetGameBoard}>
                            Play Again?
                        </button>
                    </div>
                </Modal>
                <div className='Board'>
                    <h1>
                        Lights <span>Out</span>
                    </h1>
                    <table className='GameBoard'>
                        <tbody>{this.renderGameBoard()}</tbody>
                    </table>
                    <div className='Stats'>
                        <p>
                            Number of moves: <span>{this.state.nMoves}</span>
                        </p>
                        <p>
                            Elapsed Time:{' '}
                            <Counter
                                gameOver={this.state.hasWon}
                                count={this.state.nTime}
                                onChange={this.handleCounterChange}
                            />
                        </p>
                    </div>
                    <button onClick={this.resetGameBoard}>New Game</button>
                </div>
            </>
        );
    }
}

export default Board;
