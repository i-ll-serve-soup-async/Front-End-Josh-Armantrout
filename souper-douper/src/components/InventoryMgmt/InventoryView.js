import React from "react";
import Inventory from "./Inventory";

const InventoryWrapper = props => {
  return (
    <div>
      <Inventory
        history={props.history}
        items={props.items}
      />
    </div>
  );
};

export default InventoryWrapper;
