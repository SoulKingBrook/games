import React, { Component } from "react";
import song from "./win.mp3";
import "../App.css";
class Tictactoe extends Component {
  state = {
    board: [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    turn: "X",
    audio: new Audio(song),
  };

  render() {
    return (
      <div className="center">
        <div style={{ width: "200px", height: "200px" }}>
          <div
            style={{ width: "550px", height: "300px", position: "center" }}
            className={
              this.check() && this.check() === "Xwins"
                ? "xwin"
                : this.check() === "Owins"
                ? "owin"
                : this.check() === "Tie"
                ? "tie"
                : "tictactoe"
            }
          ></div>
          <table className="table table-bordered table-sm">
            <tbody>
              {this.state.board.map((r, i) => {
                return (
                  <tr>
                    {r.map((e, j) => {
                      return (
                        <td>
                          <button
                            onClick={() => this.c(i, j)}
                            className={this.getclass(e)}
                          ></button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="bottom-pad">{""}</div>
        </div>
      </div>
    );
  }
  c(i, j) {
    const { board, turn } = this.state;
    let x = board[i][j] === " ";
    let y = this.check();
    if (x && !y) {
      let b = [...board];
      b[i][j] = turn;
      let t = turn;
      if (t === "X") {
        t = "O";
      } else {
        t = "X";
      }

      this.setState({ board: b, turn: t });
    }
  }
  check() {
    let { board } = this.state;
    let x;

    for (let i = 0; i < 3; i++) {
      x = board[i][0] === board[i][1] && board[i][2] === board[i][1];
      if (x && board[i][0] !== " ") {
        return board[i][0] + "wins";
      }
    }
    for (let i = 0; i < 3; i++) {
      x = board[0][i] === board[1][i] && board[2][i] === board[1][i];
      if (x && board[0][i] !== " ") {
        return board[0][i] + "wins";
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== " "
    ) {
      return board[0][0] + "wins";
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== " "
    ) {
      return board[0][2] + "wins";
    }
    let z = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          z = true;
          break;
        }
        if (i === 2 && j === 2 && board[i][j] !== " ") {
          return "Tie";
        }
      }
      if (z) {
        break;
      }
    }
  }
  getclass(text) {
    let classes = "Square";
    if (text === "X") {
      classes = "xcss";
    } else if (text === "O") {
      classes = "ocss";
    }
    return classes;
  }
}
export default Tictactoe;
