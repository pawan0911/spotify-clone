import React from "react";
import "./App.css";
import { loginUrl } from "./env";

function Login() {
  return (
    <div className="App">
      <a href={loginUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;