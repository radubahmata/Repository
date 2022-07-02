import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game } from "./app";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
      <Game />
  )