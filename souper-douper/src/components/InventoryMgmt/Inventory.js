import React from "react";

const Inventory = props => {
  const routeToItem = (e, item) => {
    e.preventDefault();
    props.history.push(`/inventory/${item.id}`);
  };
  return (
    <div className="items-container">
      {props.items.map(item => (
        <div
          onClick={e => {
            routeToItem(e, item);
          }}
          className="item-card-in-stock"
          key={item.id}
        >
          <img
            className="item-img-in-stock"
            onImgError={props.onImgError}
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
