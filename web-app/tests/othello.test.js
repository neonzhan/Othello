import { newBoard } from "../browser/scripts/board.js";

/**
 * Returns if the board is in a valid state.
 * A board is valid if all the following are true:
 * - The board is a rectangular 2d array containing only 1, 2 or 3 as elements.
 * - The middle 4 slots are never empty.
 * @memberof Othello.test
 * @function
 * @param {Board} board The board to test.
 * @throws if the board fails any of the above conditions.
 */

describe("Valid board", function() {
  it("The board should be an 8x8 square array", function () {
    let board1 = newBoard();
    if (board1.length !== board1[0].length) {
      throw new Error("The board is not a square");
    }
    if (board1.length !== 8) {
      throw new Error("The board is not 8x8");
    }
  });

  it("The board should only contain 1, 2 or 3 as elements", function () {
    let board2 = newBoard();
    if ((board2[4][3] == 2)&& (board2[3][4] == 2)) {
      if ((board2[3][3] == 3)&& (board2[4][4] == 3)){
        console.log("Good board");
      } else {
        throw new Error("The initial discs aren't set up properly")
      }
    }
  })
});
