import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            className="rounded-circle"
            src="https://www.logolynx.com/images/logolynx/s_97/97ea3c4830af16f056acff7d9901c213.jpeg"
            alt=""
            width="80"
            height="80"
          />
        </Link>
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/sudoku">
                sudoku
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tictactoe">
                Tic-Tac-Toe
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
