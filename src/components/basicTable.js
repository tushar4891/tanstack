import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getGroupedRowModel, // For handling grouping
} from "@tanstack/react-table";

import { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import TableHeader from "./TableHeader";
import { AllContext } from "../Context/AllContext";
import { Page } from "./Pagination/Page";

export default function BasicTable({ data, columns, checkedColumns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [grouping, setGrouping] = useState([]);
  const { selectedColumnForFilter, sortDirection } = useContext(AllContext); // Get sorting details from context

  const {
    selectedColumn,
    isGroupingApplied,
    setIsGroupingApplied,
    filterText,
    dateRange,
  } = useContext(AllContext);

  useEffect(() => {
    if (isGroupingApplied && selectedColumn) {
      setGrouping([selectedColumn]);
    } else {
      setGrouping([]);
    }
  }, [isGroupingApplied, selectedColumn]);

  useEffect(() => {
    if (selectedColumnForFilter) {
      setSorting([
        { id: selectedColumnForFilter, desc: sortDirection === "desc" },
      ]);
    } else {
      setSorting([]);
    }
  }, [selectedColumnForFilter, sortDirection]);

  const filteredData = useMemo(() => {
    if (!filterText && (!dateRange || dateRange.length === 0)) return data; // If no filters, return all data

    return data.filter((item) => {
      const field1 = item.name ? item.name.toLowerCase() : "";
      const field2 = item.category ? item.category.toLowerCase() : "";
      const field3 = item.subcategory ? item.subcategory.toLowerCase() : "";

      const createdAt = new Date(item.createdAt);
      const startDate =
        dateRange && dateRange[0] ? new Date(dateRange[0]) : null;
      const endDate = dateRange && dateRange[1] ? new Date(dateRange[1]) : null;

      // Check if the item falls within the date range
      const isWithinDateRange =
        (!startDate || createdAt >= startDate) &&
        (!endDate || createdAt <= endDate);

      // Check if text filtering or date range filtering applies
      return (
        (field1.includes(filterText.toLowerCase()) ||
          field2.includes(filterText.toLowerCase()) ||
          field3.includes(filterText.toLowerCase())) &&
        isWithinDateRange
      );
    });
  }, [data, filterText, dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      grouping,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onGroupingChange: setGrouping,
  });

  return (
    <div className="w3-container">
      <TableHeader filtering={filtering} setFiltering={setFiltering} />
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: (
                            <IoIosArrowRoundUp
                              style={{ height: "30px", width: "25px" }}
                            />
                          ),
                          desc: (
                            <IoIosArrowRoundDown
                              style={{ height: "30px", width: "25px" }}
                            />
                          ),
                        }[header.column.getIsSorted() ?? null]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => {
                  let cellContent;

                  // Check if the cell is grouped or aggregated
                  if (row.getIsGrouped()) {
                    if (cell.getIsAggregated()) {
                      // Check if the column defines an aggregation function, apply it if present
                      const aggregatedValue = cell.getValue(); // Already pre-aggregated value
                      cellContent = aggregatedValue;
                    } else {
                      // It's a grouped row without aggregation, showing count
                      cellContent = `Grouped (${row.subRows.length})`;
                    }
                  } else {
                    // Normal row rendering
                    cellContent = flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    );
                  }

                  return <td key={cell.id}>{cellContent}</td>;
                })}
              </tr>

              {row.subRows.length > 0 && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    {/* Render sub-rows */}
                    <table>
                      <tbody>
                        {row.subRows.map((subRow) => (
                          <tr key={subRow.id}>
                            {subRow.getVisibleCells().map((subCell) => (
                              <td key={subCell.id}>
                                {flexRender(
                                  subCell.column.columnDef.cell,
                                  subCell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Page table={table} />
    </div>
  );
}
