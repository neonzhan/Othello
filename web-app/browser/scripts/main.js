import { newBoard } from "./board.js";
import { PLAYER_WHITE, PLAYER_BLACK, BOARD_SIZE, STATE_BLACK, STATE_WHITE } from "./constants.js";
import { viewAlertPlayerTurnInvalid,
    viewAlertNextTurn, updateViewBasedOnBoardState, updateViewWithWinningPlayer } from "./view.js";
import { isTurnValid, doValidTurn, 
    isGameOver, areMoreMovesPossible, } from "./controller.js";

let board = newBoard();
let current_player = PLAYER_BLACK;

/**
 * Checks whether a turn is valid for a given player and coordinates.
 * @param {number[]} board -
 * @returns {boolean}
 */
function squareClicked(col_num, row_num) {
  console.log("square clicked: " + col_num + row_num);

  // If the square is invalid, we need to tell the player.
  if (!isTurnValid(board, current_player, col_num, row_num)) {
    viewAlertPlayerTurnInvalid();
    return;
  }

  // The turn is valid, so we flip the squares.
  console.log("doing valid turn");
  board = doValidTurn(board, current_player, col_num, row_num);
  console.log("updating view based on board state");
  updateViewBasedOnBoardState(board);

  // Before we switch to the next player, we need to tell if the game has ended.
  console.log("checking if game is over");
  if (isGameOver(board)) {
    updateViewWithWinningPlayer(board);
    return;
  }

  // Stay with the current player if opponent does not have valid moves.
  let opponent;
  if (current_player === PLAYER_BLACK) {
    opponent = PLAYER_WHITE;
  } else {
    opponent = PLAYER_BLACK;
  }
  console.log("checking if more moves are possible");
  if (areMoreMovesPossible(board, opponent)) {
    current_player = opponent;
  }

  viewAlertNextTurn(current_player);
}

// Once HTML is loaded, update the view.
// https://stackoverflow.com/a/38075603
window.addEventListener("load", function() {
    window.squareClicked = squareClicked;
    updateViewBasedOnBoardState(board);
});

/**
 * Counts the number of white discs on the board once the game has ended.
 * Returns the count of number of white discs.
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @returns {number} Number of white discs on board
 */
export function countWhiteDiscs(board) {
  let count_white = 0
  for (let col_num = 0; col_num < BOARD_SIZE; col_num++) {
    for (let row_num = 0; row_num < BOARD_SIZE; row_num++) {
      const square = board[col_num][row_num];
      if (square == STATE_WHITE) {
        count_white++;
      }
    }
  }
  return count_white;
}

/**
 * Counts the number of black discs on the board once the game has ended.
 * Returns the count of number of black discs.
 * @param {number[]} board - 8x8 array of numbers, where each number represents a board state from constants.js.
 * @returns {number} Number of black discs on board
 */
export function countBlackDiscs(board) {
  let count_black = 0
  for (let col_num = 0; col_num < BOARD_SIZE; col_num++) {
    for (let row_num = 0; row_num < BOARD_SIZE; row_num++) {
      const square = board[col_num][row_num];
      if (square == STATE_BLACK) {
        count_black++;
      }
    }
  }
  return count_black;
}
