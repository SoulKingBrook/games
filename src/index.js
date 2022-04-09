import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tictactoe from "./components/Tictactoe";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./components/navbar";
import Sudoku from "./components/sudoku";
import Home from "./components/home";

ReactDOM.render(
  <BrowserRouter style={{ align: "center" }}>
    <NavBar style={{ position: "fixed" }} />
    <Switch>
      <Route path="/sudoku" component={Sudoku} />
      <Route path="/tictactoe" component={Tictactoe} />
      <Route path="/" exact component={Home} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
