import { STATE_EMPTY, STATE_BLACK, STATE_WHITE, PLAYER_BLACK,
  PLAYER_WHITE, BOARD_SIZE} from "./constants.js";

/**
 * Checks whether a turn is valid for a given player and coordinates.
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @param {string} player - The player for the turn, either PLAYER_BLACK or PLAYER_WHITE from constants.js.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {boolean} True if valid, False if not.
 */
export function isTurnValid(board, player, col_num, row_num) {
  if (board[col_num][row_num] !== STATE_EMPTY) {
    return false;
  }
  if (getSquaresToOutflank(board, player, col_num, row_num).length === 0) {
    return false;
  }
  return true;
}

/**
 * Checks whether a turn is valid for a given player and coordinates.
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @param {string} player - The player for the turn, either PLAYER_BLACK or PLAYER_WHITE from constants.js.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {boolean} True if valid, False if not.
 */
export function doValidTurn(board, player, col_num, row_num) {
  let player_color;
  if (player === PLAYER_BLACK) {
    player_color = STATE_BLACK;
  } else {
    player_color = STATE_WHITE;
  }

  board[col_num][row_num] = player_color;

  const squaresToOutflank = getSquaresToOutflank(board, player, col_num, row_num);
  for (let i = 0; i < squaresToOutflank.length; i++) {
    const squareToOutflank = squaresToOutflank[i];
    const col_num_to_change = squareToOutflank[0];
    const row_num_to_change = squareToOutflank[1];
    board[col_num_to_change][row_num_to_change] = player_color;
  }

  return board;
}

/**
 * Checks whether there are anymore valid moves for the players
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @param {string} player - The player for the turn, either PLAYER_BLACK or PLAYER_WHITE from constants.js.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {boolean} True if valid, False if not.
 */
export function areMoreMovesPossible(board, player) {
  for (let col_num = 0; col_num < BOARD_SIZE; col_num++) {
    for (let row_num = 0; row_num < BOARD_SIZE; row_num++) {
      if (isTurnValid(board, player, col_num, row_num)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Checks if the game is over.
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @param {string} player - The player for the turn, either PLAYER_BLACK or PLAYER_WHITE from constants.js.
 * @returns {boolean} True if valid, False if not.
 */
export function isGameOver(board) {
  return !areMoreMovesPossible(board, PLAYER_WHITE) && !areMoreMovesPossible(board, PLAYER_BLACK);
}

/**
 * Checks whether a square is on the board.
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @param {number} col_num - The column number where 0 is leftmost, and 7 is rightmost.
 * @param {number} row_num - The row number where 0 is the top, and 7 is the bottom.
 * @returns {boolean} True if valid, False if not.
 */
function isSquareOnBoard(col_num, row_num) {
  if (col_num < 0 || col_num > 7) {
    return false;
  } else if (row_num < 0 || row_num > 7) {
    return false;
  }
  return true;
}

/**
 * Checks if there are outflanked squares along one direction from the placed square.
 * Returns array containing pieces to outflank of structure [col_num, row_num].
 * @param {number[]} outflanked_pieces - 8x8 array of numbers representing the outflanked pieces.
 * @param {string} player - Either PLAYER_BLACK or PLAYER_WHITE.
 * @param {number} placed_col - Column number of square placed down upon.
 * @param {number} placed_row - Row number of square placed down upon.
 * @param {number} col_shift - Column number of squares shifted from the placed square.
 * @param {number} row_shift - Row number of squares shifted from the placed square.
 * @returns {number[][]} Each outflanked piece is an array of two elements, [col_num, row_num].
 */
function getSquaresToOutflankInOneDirection(board, player, placed_col,
  placed_row, col_shift, row_shift) {
  let outflanked_pieces = [];

  let player_color;
  let opponent_color;
  if (player === PLAYER_BLACK) {
    player_color = STATE_BLACK;
    opponent_color = STATE_WHITE;
  } else {
    player_color = STATE_WHITE;
    opponent_color = STATE_BLACK;
  }

  let col_num_to_check = placed_col + col_shift;
  let row_num_to_check = placed_row + row_shift;
  while (isSquareOnBoard(col_num_to_check, row_num_to_check)) {
    const square = board[col_num_to_check][row_num_to_check];
    if (square == player_color) {
      if (outflanked_pieces.length === 0) {
        // We have not encountered opponent squares, so this is invalid.
        return [];
      } else {
        // We have already encountered opponent squares.
        return outflanked_pieces;
      }
    } else if (square == opponent_color) {
      outflanked_pieces.push([col_num_to_check, row_num_to_check]);
    } else if (square == STATE_EMPTY) {
      return [];
    }
    col_num_to_check += col_shift;
    row_num_to_check += row_shift;
  }
  return [];
}

/**
 * Adds and collects the outflanked from all directions.
 * Returns array containing pieces to outflank of structure [col_num, row_num].
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.y
 * @param {string} player - Either PLAYER_BLACK or PLAYER_WHITE.
 * @param {number} placed_col - Column number of square placed down upon.
 * @param {number} placed_row - Row number of square placed down upon.
 * @returns {number[][]} Each outflanked piece is an array of two elements, [col_num, row_num].
 */
function getSquaresToOutflank(board, player, placed_col, placed_row) {
  let outflanked_pieces = [];
  for (let col_num = -1; col_num <= 1; col_num++) {
    for (let row_num = -1; row_num <= 1; row_num++) {
      if (col_num == 0 && row_num == 0) {
        continue;
      }
      outflanked_pieces = outflanked_pieces.concat(getSquaresToOutflankInOneDirection(board, player, placed_col, placed_row, col_num, row_num));
    }
  }
  return outflanked_pieces;
}
