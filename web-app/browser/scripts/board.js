import { BOARD_SIZE, STATE_BLACK, STATE_WHITE,
  STATE_EMPTY } from "./constants.js";

/**
 * Creates a new board set up according to the game rules.
 * @param {number[]} board 8x8 array of numbers, where each number represents a board state from constants.js.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {number[]} 8x8 array of board states from constants.js.
 */
export function newBoard() {
  let board = [];
  for (let col_num = 0; col_num < BOARD_SIZE; col_num++) {
    const column = [];
    for (let row_num = 0; row_num < BOARD_SIZE; row_num++) {
      if (_shouldNewBoardCellBeWhite(col_num, row_num)) {
        column.push(STATE_WHITE);
      } else if (_shouldNewBoardCellBeBlack(col_num, row_num)) {
        column.push(STATE_BLACK);
      } else {
        column.push(STATE_EMPTY);
      }
    }

    board.push(column);
  }
  return board;
}

/**
 * Adds starting white discs to the new board.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {boolean} True if valid, False if not.
 */
function _shouldNewBoardCellBeWhite(col_num, row_num) {
  if (col_num == 3 && row_num == 3) {
    return true;
  } else if (col_num == 4 && row_num == 4) {
    return true;
  } else {
    return false;
  }
}

/**
 * Adds starting black discs to the new board.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {boolean} True if valid, False if not.
 */
function _shouldNewBoardCellBeBlack(col_num, row_num) {
  if (col_num == 3 && row_num == 4) {
    return true;
  } else if (col_num == 4 && row_num == 3) {
    return true;
  } else {
    return false;
  }
}
