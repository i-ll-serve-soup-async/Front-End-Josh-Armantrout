import React from "react";
import Inventory from "./Inventory";

const InventoryView = props => {
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

export default InventoryView;
