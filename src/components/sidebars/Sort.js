import React, { useContext } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { AllContext } from "../../Context/AllContext";

export const Sort = () => {
  const { setSelectedColumnForFilter, setSortDirection } =
    useContext(AllContext);

  const columnName = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "category", label: "Category" },
    { id: "subcategory", label: "SubCategory" },
    { id: "createdAt", label: "CreatedAt" },
    { id: "updatedAt", label: "UpdatedAt" },
    { id: "price", label: "Price" },
    { id: "sale_price", label: "Sale Price" },
  ];

  const handleSort = (columnId) => {
    setSelectedColumnForFilter(columnId);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasSort"
        aria-labelledby="offcanvasSortLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasSortLabel">Sorting Options </h5>
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
              <div
                className="shadow-2  mb-4 d-flex gap-3 align-items-center"
                onClick={() => handleSort(column.id)}
                style={{ cursor: "pointer" }}
              >
                <p
                  className="text-muted"
                  style={{ marginBottom: "0", fontSize: "16px" }}
                >
                  {column.label}
                </p>

                <LuArrowUpDown
                  style={{ height: "22px", width: "22px", fontSize: "16px" }}
                />
              </div>
            </div>
          ))}

          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-block"
              style={{
                backgroundColor: "#036ff6",
                color: "white",
                fontSize: "14px",
              }}
              onClick={() => {
                setSelectedColumnForFilter("");
                setSortDirection("asc");
              }}
            >
              Clear Sort
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
