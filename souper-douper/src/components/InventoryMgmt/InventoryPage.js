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

  componentDidMount() {
    let auth = {
      headers: {
        authorization: localStorage.getItem("token")
      }
    };
    axios
      .get("https://soup-kitchen-backend.herokuapp.com/api/items", auth)
      .then(res => {
        console.log(res.data);
        this.setState({ items: res.data.items });
      })
      .catch(err => console.log(err));
  }
  // pass below function to AddInventory.js as addNewItem on props
  addItemHandler = e => {
    e.preventDefault();
    let newItem = {
      name: e.target[0].value,
      amount: parseInt(e.target[1].value),
      unit: e.target[2].value,
      imageUrl: e.target[3].value,
      categoryID: e.target[4].value
    };
    let auth = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    axios
      .post(
        "https://soup-kitchen-backend.herokuapp.com/api/items",
        newItem,
        auth
      )
      .then(res => {
        this.setState({ items: res.data.items });
      })
      .catch(err => console.log(err));
    e.target.reset();
  };

  logUserOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <div className="inventory-page">
        <NavBar logUserOut={this.logUserOut} />
        <Route
          exact
          path="/"
          render={props => (
            <InventoryView {...props} items={this.state.items} />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <AddInventory {...props} addNewItem={this.addItemHandler} />
          )}
        />
      </div>
    );
  }
}

export default InventoryPage;
