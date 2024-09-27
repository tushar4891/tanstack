// ColumnContext.js
import React, { createContext, useState } from "react";

// Create the context
export const AllContext = createContext();

// Create a provider component
export const AllProvider = ({ children }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [isGroupingApplied, setIsGroupingApplied] = useState(false); // State to control when grouping is applied
  const [filterText, setFilterText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedColumnForFilter, setSelectedColumnForFilter] = useState("");

  return (
    <AllContext.Provider
      value={{
        selectedColumn,
        setSelectedColumn,
        isGroupingApplied,
        setIsGroupingApplied,
        filterText,
        setFilterText,
        setDateRange,
        sortDirection,
        setSortDirection,
        selectedColumnForFilter,
        setSelectedColumnForFilter,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
