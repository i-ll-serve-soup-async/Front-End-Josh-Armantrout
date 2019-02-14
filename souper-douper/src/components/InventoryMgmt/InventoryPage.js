//libraries
import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
//components
import NavBar from "../NavBar/NavBar";
import InventoryView from "./InventoryView";
import AddInventory from "./AddInventory";
import defaultimg from "../../images/item-default.png";
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
  // pass below function to AddInventory.js on props
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
        auth,
        newItem
      )
      .then(res => {
        console.log(res.data);
        this.setState({ items: res.data.items });
      })
      .catch(err => {
        alert("Unable to add New Item");
        console.log(err);
      });
    // e.target.reset();
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

  // this will add a default image if a user doesn't submit an img url in the Add Item Form
  addItemDefaultImg = e => {
    e.target.src = { defaultimg };
  };

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
            <InventoryView
              {...props}
              items={this.state.items}
              onImgError={this.addItemDefaultImg}
            />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <AddInventory addItemHandler={this.addItemHandler} {...props} />
          )}
        />
        <Route
          path="/inventory/:id"
          render={props => (
            <Item
              {...props}
              updateHandler={this.setInventoryState}
              onImgError={this.addItemDefaultImg}
              items={this.state.items}
              updateItem={this.updateItem}
              deleteItem={this.deleteItem}
            />
          )}
        />
        <Route
          path="/inventory/edit"
          render={props => (
            <EditItem
              {...props}
              updateHandler={this.setInventoryState}
              items={this.state.items}
            />
          )}
        />
      </div>
    );
  }
}

export default InventoryPage;
