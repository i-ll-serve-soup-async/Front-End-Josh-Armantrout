import React, { Component } from "react";
import InventoryPage from "./components/InventoryMgmt/InventoryPage";
import Login from "./components/Login/Login";
import Authentication from "./components/Login/Authentication";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <InventoryPage />
      </div>
    );
  }
}

export default Authentication(App)(Login);
