import React from "react";

const Inventory = props => {
  return (
    <div className="items-container">
      {props.items.map(item => (
        <div className="item-card-in-stock">
          <img
            className="item-img-in-stock"
            onError={props.onError}
            src={item.imageURL}
            alt={item.name}
          />
          <div className="item-text-blurb">
            <p>
              <span className="item-amt">{item.amount}</span> {item.unit}
            </p>
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
