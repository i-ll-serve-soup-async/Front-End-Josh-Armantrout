import React from "react";
import axios from "axios";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      item: {
        name: "",
        amount: "",
        unit: "",
        imageURL: "",
        categoryID: ""
      }
    };
  }

  incrementItem = (id, item) => {
    let auth = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    let incrementedItem = {
      name: item.name,
      amount: item.amount + 1,
      unit: item.unit,
      imageURL: item.imageURL,
      categoryID: item.categoryID
    };
    axios
      .put(
        `https://soup-kitchen-backend.herokuapp.com/api/items/${id}`,
        incrementedItem,
        auth
      )
      .then(res => {
        console.log(res);
        this.props.updateHandler();
        this.setState(this.state);
      })
      .catch(error => console.log(error));
  };

  decrementItem = (id, item) => {
    let auth = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    let decrementedItem = {
      name: item.name,
      amount: item.amount - 1,
      unit: item.unit,
      imageURL: item.imageURL,
      categoryID: item.categoryID
    };
    axios
      .put(
        `https://soup-kitchen-backend.herokuapp.com/api/items/${id}`,
        decrementedItem,
        auth
      )
      .then(res => {
        console.log(res);
        this.props.updateHandler();
        this.setState(this.state);
      })
      .catch(error => console.log(error));
  };

  render() {
    let item = this.props.items.find(
      banana => `${banana.id}` === this.props.match.params.id
    );
    if (!item) {
      return <div />;
    }
    return (
      <div className="item-container">
        <div className="item-header">
          <div className="image-wrapper">
            <img src={item.imageURL} alt={item.name} />
          </div>
          <div className="item-title-wrapper">
            <h2>{item.name}</h2>
            <div className="item-counter">
              <button onClick={() => this.incrementItem(item.id, item)}>
                +
              </button>
              <h4>
                {item.amount} {item.unit}
              </h4>
              <button onClick={() => this.decrementItem(item.id, item)}>
                -
              </button>
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <button
            onClick={e => {
              const location = {
                pathname: `/inventory/edit`,
                state: { item }
              };
              this.props.history.push(location);
            }}
            className="item-update-button"
          >
            Update
          </button>
          <button
            onClick={event => {
              this.props.deleteItem(event, item.id, this.props.history);
              this.props.updateHandler();
            }}
            className="item-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
