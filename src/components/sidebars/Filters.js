import React, { useContext, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { SlRefresh } from "react-icons/sl";
import { AllContext } from "../../Context/AllContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker

export const Filters = () => {
  const { filterText, setFilterText, dateRange, setDateRange } =
    useContext(AllContext);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
  };

  // Handle reset input
  const handleTextReset = () => {
    setFilterText(""); // Clear the input field
  };

  // // Handle reset input
  // const handleReset = () => {
  //   setFilterText(""); // Clear the input field
  //   setDateRange([null, null]); // Clear date range
  // };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasFilters"
        aria-labelledby="offcanvasSortLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasSortLabel">Filters</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
          <div>
            {/* Name  */}
            <div>
              <div className="gap-5 border-5 shadow-sm">
                <div className="d-flex justify-content-between">
                  <p
                    className="mt-2 ms-2 text-muted"
                    style={{ marginBottom: "0", fontSize: "16px" }}
                  >
                    Name
                  </p>
                  <SlRefresh
                    className=" me-3 mt-2 "
                    style={{ height: "20px", width: "20px" }}
                    onClick={handleTextReset}
                  />
                </div>
                <input
                  type="text"
                  className=" mt-2 ms-2 mb-2"
                  style={{ width: "300px", height: "30px" }}
                  value={filterText}
                  onChange={handleInputChange}
                  placeholder="  Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
