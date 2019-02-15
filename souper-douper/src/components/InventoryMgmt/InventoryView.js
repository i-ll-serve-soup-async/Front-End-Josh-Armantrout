import React from "react";
import Inventory from "./Inventory";

const InventoryView = props => {
  return (
    <div>
      <Inventory history={props.history} items={props.items} />
    </div>
  );
};

export default InventoryView;
