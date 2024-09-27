import React, { useEffect, useState } from "react";
import "./Hide_unhide.css";

function Hide_Unhide({ checkedColumns, setCheckedColumns }) {
  const [isChecked, setIsChecked] = useState(true);

  const columnName = [
    { id: "ID", label: "ID" },
    { id: "Name", label: "Name" },
    { id: "Category", label: "Category" },
    { id: "Subcategory", label: "Subcategory" },
    { id: "CreatedAt", label: "CreatedAt" },
    { id: "UpdatedAt", label: "UpdatedAt" },
    { id: "Price", label: "Price" },
    { id: "Sale Price", label: "Sale Price" },
  ];

  // Handle checkbox change for a specific column
  const handleCheckBoxChange = (columnId) => {
    // Toggle the state of the specific column
    setCheckedColumns((prevCheckedColumns) => ({
      ...prevCheckedColumns,
      [columnId]: !prevCheckedColumns[columnId],
    }));
  };

  // Show All columns
  const handleShowAll = () => {
    const allVisible = {};
    columnName.forEach((column) => {
      allVisible[column.id] = true; // Set all columns to visible
    });
    setCheckedColumns(allVisible);
  };

  // Hide All columns
  const handleHideAll = () => {
    const allHidden = {};
    columnName.forEach((column) => {
      allHidden[column.id] = false; // Set all columns to hidden
    });
    setCheckedColumns(allHidden);
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Hide / Unhide Column </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
          {columnName.map((column, index) => (
            <div key={index} className="d-flex flex-column">
              <div className="shadow-2  mb-4 d-flex justify-content-between align-items-center">
                {/* <h5>{column.label} </h5> */}
                <p
                  className="text-muted"
                  style={{ marginBottom: "0", fontSize: "16px" }}
                >
                  {column.label}
                </p>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={column.id}
                    checked={checkedColumns[column.id]}
                    onClick={() => handleCheckBoxChange(column.id)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex flex-column mt-2 gap-2">
            <button
              className="btn btn-block"
              style={{
                backgroundColor: "#036ff6",
                color: "white",
                fontSize: "14px",
              }}
              onClick={handleShowAll}
            >
              Show All
            </button>
            <button
              className="btn btn-block"
              style={{
                backgroundColor: "#036ff6",
                color: "white",
                fontSize: "14px",
              }}
              onClick={handleHideAll}
            >
              Hide All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hide_Unhide;
