import React, { Component } from "react";
import "../App.css";
import { getBoards } from "../boards/boards";
class Sudoku extends Component {
  state = {
    board: getBoards(),
    safe: [],
    solvable: true,
    solving: false,
    safedone: false,
  };
  componentDidMount() {
    for (let i = 0; i < 9; i++) {
      this.state.safe.push([...this.state.board[i]]);
    }
    this.setState({ safedone: true });
  }
  render() {
    return (
      <div className="center1">
        <div style={{ width: "200px", height: "200px" }}>
          <div
            style={{ width: "500px", height: "300px", position: "center" }}
            className={
              this.checkSafe() && this.findFirstzero()[0] === -1
                ? "win"
                : "Sudoku"
            }
          ></div>
          <table className="table table-bordered">
            <tbody>
              {this.state.board.length > 0 &&
                this.state.board.map((r, i) => {
                  return (
                    <tr key={i}>
                      {r.map((e, j) => {
                        return (
                          <td key={j}>
                            <button
                              className={this.getClass(i, j)}
                              onClick={() => this.handleClick(i, j)}
                              disabled={
                                this.state.safedone &&
                                this.state.safe[i][j] !== 0
                              }
                            ></button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="bottom-pad">
            {(this.state.solvable && (
              <button
                className="btn btn-primary"
                disabled={this.state.solving}
                onClick={() => this.solver()}
              >
                solve
              </button>
            )) || (
              <button className="btn btn-danger" disabled={true}>
                sorry
              </button>
            )}

            <button
              className="btn btn-warning"
              onClick={this.reset}
              style={{ float: "right" }}
            >
              reset
            </button>
          </div>
        </div>
      </div>
    );
  }
  handleClick = (i, j) => {
    let board = [...this.state.board];
    if (board[i][j] === 9) {
      board[i][j] = 0;
    } else {
      board[i][j]++;
    }
    this.setState({ board });
  };
  getClass = (i, j) => {
    let x = this.state.board[i][j];
    return "css" + x;
  };
  checkSafe = () => {
    let board = [...this.state.board];
    for (let i = 0; i < 9; i++) {
      let counter = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      let counter1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let j = 0; j < 9; j++) {
        counter[board[i][j] - 1]++;
        if (counter[board[i][j] - 1] > 1) {
          return false;
        }
        counter1[board[j][i] - 1]++;
        if (counter1[board[j][i] - 1] > 1) {
          return false;
        }
      }
    }
    return true;
  };
  check = (i, j, x) => {
    let board = [...this.state.board];
    for (let k = 0; k < 9; k++) {
      if (k !== j && board[i][k] === x) {
        return false;
      }
      if (k !== i && board[k][j] === x) {
        return false;
      }
    }
    return true;
  };
  solve = (x) => {
    let indexes = this.findFirstzero();
    let i = indexes[0];
    let j = indexes[1];
    let board = [...this.state.board];
    if (i !== -1 && j !== -1 && x < 10) {
      board[i][j] = x;
      this.setState({ board });
      if (this.check(i, j, x) && this.solve(1)) {
        return true;
      } else {
        board[i][j] = 0;
        this.setState({ board });
        if (x < 9) {
          return this.solve(x + 1, board);
        } else {
          return false;
        }
      }
    } else {
      this.setState({ board, solving: false });
      return true;
    }
  };
  reset = () => {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push([...this.state.safe[i]]);
    }
    this.setState({ board, solvable: true });
  };
  solver() {
    if (this.checkSafe()) {
      if (this.solve(1)) {
        this.setState({ solvable: true });
      } else {
        this.setState({ solvable: false });
      }
    } else {
      this.setState({ solvable: false });
    }
  }
  findFirstzero = () => {
    let i, j;
    let board = [...this.state.board];
    for (i = 0; i < 9; i++) {
      j = board[i].indexOf(0);
      if (j !== -1) {
        break;
      }
    }
    if (j === -1) {
      i = -1;
    }
    return [i, j];
  };
}
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
export default Sudoku;
