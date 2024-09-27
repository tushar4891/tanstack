import React, { useContext, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { AllContext } from "../../Context/AllContext";

export const Groups = () => {
  const { selectedColumn, setSelectedColumn, setIsGroupingApplied } =
    useContext(AllContext);
  const handleSelectedCategory = (event) => {
    setSelectedColumn(event.target.value);
  };
  const handleApplyGrouping = () => {
    setIsGroupingApplied(true); // Trigger grouping
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasGroups"
        aria-labelledby="offcanvasSortLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasSortLabel">Create Groups </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
          <div className=" d-flex flex-column gap-3 ">
            <select
              className="form-select w-75"
              value={selectedColumn}
              onChange={handleSelectedCategory}
            >
              <option value="category">Category</option>
              <option value="subcategory">SubCategory</option>
            </select>
            <div className="d-flex flex-column gap-2 mt-4">
              <button
                className="btn btn-block"
                style={{
                  backgroundColor: "#036ff6",
                  color: "white",
                  fontSize: "14px",
                }}
                onClick={() => setIsGroupingApplied(false)}
              >
                Clear Grouping
              </button>
              <button
                className="btn btn-block"
                style={{
                  backgroundColor: "#036ff6",
                  color: "white",
                  fontSize: "14px",
                }}
                onClick={handleApplyGrouping} // Apply grouping when clicked
              >
                Apply Grouping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
