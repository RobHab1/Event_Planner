import React from "react";
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <h3>Total cost for the event</h3>
        </div>

        <h2 id="pre_fee_cost_display" className="price">
          ${totalCosts}
        </h2>

        <div className="items_breakdown">
          <h4>Breakdown</h4>
          {ItemsDisplay && <ItemsDisplay />}
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
