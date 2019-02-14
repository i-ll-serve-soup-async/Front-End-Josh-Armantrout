import React from "react";
import axios from "axios";
import Select from "react-select";

class EditItem extends React.Component {
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
      },
      selectedCategory: null,
      categories: []
    };
  }

  componentDidMount() {
    let auth = {
      headers: {
        authorization: localStorage.getItem("token")
      }
    };
    axios
      .get("https://soup-kitchen-backend.herokuapp.com/api/categories", auth)
      .then(res => {
        this.setState({ categories: res.data.categories });
      })
      .catch(err => {
        alert("Unable to retrieve categories from database");
        console.log(err);
      });
    let editableItem = {
      name: this.props.location.state.item.name,
      amount: this.props.location.state.item.amount,
      unit: this.props.location.state.item.unit,
      imageURL: this.props.location.state.item.imageURL,
      categoryID: parseInt(this.props.location.state.item.categoryID)
    };
    this.setState({
      id: this.props.location.state.item.id,
      item: editableItem
    });
  }

  handleChanges = e => {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value }
    });
  };

  categorySelectHandler = selectedCategory => {
    this.setState({ selectedCategory: selectedCategory });
  };

  updateItemHandler = () => {
    let auth = {
      headers: {
        authorization: localStorage.getItem("token")
      }
    };
    let categoryID = this.state.selectedCategory
      ? this.state.selectedCategory.value
      : this.state.item.categoryID;
    let updatedItem = {
      name: this.state.item.name,
      amount: parseInt(this.state.item.amount),
      unit: this.state.item.unit,
      imageURL: this.state.item.imageURL,
      categoryID: parseInt(categoryID)
    };
    axios
      .put(
        `https://soup-kitchen-backend.herokuapp.com/api/items/${this.state.id}`,
        updatedItem,
        auth
      )
      .then(res => {
        this.props.handleUpdate();
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  clickHandler = e => {
    e.preventDefault();
    this.updateItemHandler();
  };

  render() {
    const categoryOptions = this.state.categories.map(foobar => ({
      value: foobar.id,
      label: foobar.name
    }));
    return (
      <div className="form-container edit">
        <form className="item-form edit">
          <label>Item Name:</label>
          <input
            className="item-input"
            type="text"
            name="name"
            placeholder="name"
            value={this.state.item.name}
            onChange={this.handleChanges}
          />
          <div className="form-entry" />
          <label>Item Quantity:</label>
          <input
            className="item-input"
            type="text"
            name="amount"
            placeholder="amount"
            value={this.state.item.amount}
            onChange={this.handleChanges}
          />
          <div className="form-entry" />
          <label>Item Units:</label>
          <input
            className="item-input"
            type="text"
            name="unit"
            placeholder="units"
            value={this.state.item.unit}
            onChange={this.handleChanges}
          />
          <div className="form-entry" />
          <label>Image URL:</label>
          <input
            className="item-input"
            type="text"
            name="imageURL"
            placeholder="image url"
            value={this.state.item.imageURL}
            onChange={this.handleChanges}
          />
          <div className="form-entry" />
          <label>Item Category:</label>
          <Select
            className="select"
            menuPlacement="top"
            value={this.state.selectedCategory}
            onChange={this.categorySelectHandler}
            options={categoryOptions}
          />
          <div className="form-entry" />
          <button className="edit-button" onClick={this.clickHandler}>
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default EditItem;
