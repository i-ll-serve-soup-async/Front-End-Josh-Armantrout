//libraries
import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
//components
import NavBar from "../NavBar/NavBar";
import InventoryView from "./InventoryView";
import AddInventory from "./AddInventory";
import Item from "../ItemsList/Item";
import EditItem from "../ItemsList/EditItem";
//styles

class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
    return (
      <div className="inventory-page">
        {/* <NavBar />
        <InventoryView /> */}
        <h2>Inventory Page Goes Here!</h2>
      </div>
    );
  }
}

export default InventoryPage;
