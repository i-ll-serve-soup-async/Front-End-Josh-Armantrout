import React from "react";
import axios from "axios";
import Select from "react-select";

class AddInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  categorySelectHandler = selectedCategory => {
    this.setState({ selectedCategory: selectedCategory });
  };

  render() {
    const itemCategories = this.state.categories.map(cat => ({
      value: cat.id,
      label: cat.name
    }));
    return (
      <div className="add-item-container">
        <form
          className="add-item-form"
          onSubmit={e =>
            this.props.addItemHandler(e, this.state.selectedCategory.value)
          }
        >
          <label>Item Name:</label>
          <input className="item-input" type="text" placeholder="name" />
          <label>Item Quantity:</label>
          <input className="item-input" type="number" placeholder="quantity" />
          <label>Item Units:</label>
          <input className="item-input" type="text" placeholder="units" />
          <label>Image URL:</label>
          <input className="item-input" type="text" placeholder="image URL" />
          <label>Category:</label>
          <Select
            className="select"
            menuPlacement="top"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={itemCategories}
          />
          <input
            className="item-input"
            value="Add Item to Inventory"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default AddInventory;
