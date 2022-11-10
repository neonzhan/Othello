import { BOARD_SIZE, STATE_BLACK,
  STATE_WHITE, STATE_EMPTY,
  IMAGE_STATE_BLACK, IMAGE_STATE_WHITE,
  IMAGE_STATE_EMPTY } from
  "./constants.js";
import { countBlackDiscs, countWhiteDiscs } from "./main.js";

export function updateViewBasedOnBoardState(board) {
  for (let col_num = 0; col_num < BOARD_SIZE; col_num++) {
    for (let row_num = 0; row_num < BOARD_SIZE; row_num++) {
      const element = document.getElementById(col_num + "_" + row_num)
      if (board[col_num][row_num] == STATE_BLACK) {
        element.src = IMAGE_STATE_BLACK;
      } else if (board[col_num][row_num] == STATE_WHITE) {
        element.src = IMAGE_STATE_WHITE;
      } else if (board[col_num][row_num] == STATE_EMPTY) {
        element.src = IMAGE_STATE_EMPTY;
      } else {
        element.src = "";
      }
    }
  }
}

export function viewAlertPlayerTurnInvalid() {
  console.log("turn invalid");
}

export function viewAlertNextTurn(player) {
  console.log("next turn" + player);
}

export function updateViewWithWinningPlayer(board) {
  let player_winner = document.getElementById("winner");
  if (countBlackDiscs(board) > countWhiteDiscs(board)) {
    player_winner.innerHTML = "Black wins!";
  } else if (countBlackDiscs(board) < countWhiteDiscs(board)) {
    player_winner.innerHTML = "White wins!";
  } else if (countBlackDiscs(board) == countWhiteDiscs(board)) {
    player_winner.innerHTML = "DRAW!!!";
  }
}
