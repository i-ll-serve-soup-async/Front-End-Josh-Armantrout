//libraries
import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
//components
import NavBar from "../NavBar/NavBar";
import InventoryView from "./InventoryView";
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
      </div>
    );
  }
}

export default InventoryPage;
