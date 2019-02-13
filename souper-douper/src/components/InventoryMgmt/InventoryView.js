import React from "react";
import Inventory from "./Inventory";

const InventoryWrapper = props => {
  return (
    <div>
      <Inventory
        clearSearch={props.clearSearch}
        history={props.history}
        onError={props.onError}
        items={props.items}
      />
    </div>
  );
};

export default InventoryWrapper;
