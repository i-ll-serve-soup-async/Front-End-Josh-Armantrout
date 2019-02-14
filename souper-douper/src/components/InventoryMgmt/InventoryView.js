import React from "react";
import Inventory from "./Inventory";

const InventoryWrapper = props => {
  return (
    <div>
      <Inventory
        history={props.history}
        onImgError={props.onImgError}
        items={props.items}
      />
    </div>
  );
};

export default InventoryWrapper;
