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

class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      token: null
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

  // pass below function to AddInventory.js on props
  addItem = (e, categoryID) => {
    e.preventDefault();
    let newItem = {
      name: e.target[0].value,
      amount: parseInt(e.target[1].value),
      unit: e.target[2].value,
      imageUrl: e.target[3].value,
      categoryID: parseInt(categoryID)
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
        let auth = {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        };
        axios
          .get("https://soup-kitchen-backend.herokuapp.com/api/items", auth)
          .then(res => {
            this.setState({ items: res.data.items });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        alert("No new Item for YOU, SUCKER!!!");
        console.log(err);
      });
    e.target.reset();
  };

  //pass below functions to Item.js on props
  deleteItem = (e, itemID, history) => {
    e.preventDefault();
    let auth = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    axios
      .delete(
        `https://soup-kitchen-backend.herokuapp.com/api/items/${itemID}`,
        auth
      )
      .then(res => {
        axios
          .get("https://soup-kitchen-backend.herokuapp.com/api/items", auth)
          .then(res => {
            this.setState({ items: res.data.items });
          })
          .catch(err => {
            console.log(err);
          });
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  // this will update the inventory page to reflect changes in state made when updating items using increment/decrement or using the update item form
  setInventoryState = () => {
    let auth = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    axios
      .get("https://soup-kitchen-backend.herokuapp.com/api/items", auth)
      .then(res => {
        this.setState({ items: res.data.items });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // attached to LogOut button in NavBar
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
          render={props => <AddInventory {...props} addItem={this.addItem} />}
        />
        <Route
          path="/inventory/:id"
          render={props => (
            <Item
              {...props}
              items={this.state.items}
              updateItem={this.updateItem}
              deleteItem={this.deleteItem}
              updateHandler={this.setInventoryState}
            />
          )}
        />
        <Route
          path="/inventory/edit"
          render={props => (
            <EditItem
              {...props}
              items={this.state.items}
              updateHandler={this.setInventoryState}
            />
          )}
        />
      </div>
    );
  }
}

export default InventoryPage;
