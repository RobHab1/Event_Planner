import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementVenue, decrementVenue, resetVenues } from "./venueSlice";
import { incrementAv, decrementAv, resetAv } from "./avSlice";
import { incrementMeal, decrementMeal, resetMeals } from "./mealsSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const remainingAuditoriumQuantity =
    3 -
    venueItems.find(
      (item) => item.name === "Auditorium Hall (Capacity:200)"
    ).quantity;

  const handleToggleItems = () => {
    setShowItems(!showItems);
  };

  const handleReset = () => {
    dispatch(resetVenues());
    dispatch(resetAv());
    dispatch(resetMeals());
  };

  const getItemsFromTotalCost = () => {
    const venues = venueItems.filter((item) => item.quantity > 0);
    const avs = avItems.filter((item) => item.quantity > 0);
    const meals = mealsItems.filter((item) => item.quantity > 0);
    return [...venues, ...avs, ...meals];
  };

  const ItemsDisplay = ({ items }) => {
    if (!items || items.length === 0) {
      return <p>No items selected</p>;
    }
    return (
      <div className="items-display">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <span>{item.name}</span>
            <span>x {item.quantity}</span>
            <span>= ${item.cost * item.quantity}</span>
          </div>
        ))}
      </div>
    );
  };

  const calculateTotalCost = () => {
    let total = 0;
    [...venueItems, ...avItems, ...mealsItems].forEach((item) => {
      total += item.cost * item.quantity;
    });
    return total;
  };

  const totalCost = calculateTotalCost();
  const items = getItemsFromTotalCost();

  const navigateToProducts = (idType) => {
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (showItems) {
        setShowItems(false);
      }
    }
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>
              Venue
            </a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>
              Add-ons
            </a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>
              Meals
            </a>
          </div>
          <div className="nav_buttons">
            <button className="details_button" onClick={handleToggleItems}>
              Show Details
            </button>
            <button className="details_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* Venue section */}
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="card" key={index}>
                    <img src={item.img} alt={item.name} />
                    <div className="text">{item.name}</div>
                    <div className="price">${item.cost}</div>
                    <div className="button_container">
                      {item.name === "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              item.quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-warning"
                            }
                            onClick={() => dispatch(decrementVenue(index))}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {item.quantity > 0 ? item.quantity : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success"
                            }
                            onClick={() => dispatch(incrementVenue(index))}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={
                              item.quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-warning"
                            }
                            onClick={() => dispatch(decrementVenue(index))}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {item.quantity > 0 ? item.quantity : "0"}
                          </span>
                          <button
                            className={
                              item.quantity === 10
                                ? "btn-success btn-disabled"
                                : "btn-success"
                            }
                            onClick={() => dispatch(incrementVenue(index))}
                          >
                            &#43;
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons section */}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1>Add-ons Selection</h1>
              </div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div className="card" key={index}>
                    {item.img && <img src={item.img} alt={item.name} />}
                    <div className="text">{item.name}</div>
                    <div className="price">${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={
                          item.quantity === 0
                            ? "btn-warning btn-disabled"
                            : "btn-warning"
                        }
                        onClick={() => dispatch(decrementAv(index))}
                      >
                        &#8211;
                      </button>
                      <span className="selected_count">
                        {item.quantity > 0 ? item.quantity : "0"}
                      </span>
                      <button
                        className={
                          item.quantity === 10
                            ? "btn-success btn-disabled"
                            : "btn-success"
                        }
                        onClick={() => dispatch(incrementAv(index))}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meals section */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="meal_selection">
                {mealsItems.map((item, index) => (
                  <div className="card" key={index}>
                    {item.img && <img src={item.img} alt={item.name} />}
                    <div className="text">{item.name}</div>
                    <div className="price">${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={
                          item.quantity === 0
                            ? "btn-warning btn-disabled"
                            : "btn-warning"
                        }
                        onClick={() => dispatch(decrementMeal(index))}
                      >
                        &#8211;
                      </button>
                      <span className="selected_count">
                        {item.quantity > 0 ? item.quantity : "0"}
                      </span>
                      <button
                        className={
                          item.quantity === 10
                            ? "btn-success btn-disabled"
                            : "btn-success"
                        }
                        onClick={() => dispatch(incrementMeal(index))}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="total_cost">Total Event Cost: ${totalCost}</div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCost}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;
