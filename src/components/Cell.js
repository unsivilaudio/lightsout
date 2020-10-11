import React from 'react';
import '../assets/stylesheets/cell.css';

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

const cell = props => {
    const handleClick = e => {
        // call up to the board to flip cells around this cell
        props.flipCellsAroundMe();
    };

    let classes = 'Cell' + (props.isLit ? ' Cell-lit' : '');

    return <td className={classes} onClick={handleClick} />;
};

export default cell;
