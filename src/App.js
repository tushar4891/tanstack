import "./App.css";
import { DateTime } from "luxon";
import sampleData from "./sample-data.json";
import { useMemo, useState } from "react";
import BasicTable from "./components/basicTable";
import Hide_Unhide from "./components/sidebars/Hide_Unhide";
import { Sort } from "./components/sidebars/Sort";
import { Filters } from "./components/sidebars/Filters";
import { Groups } from "./components/sidebars/Groups";
import { AllProvider } from "./Context/AllContext";

function App() {
  const data = useMemo(() => sampleData, []);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        aggregationFn: (values) => values.length,

        cell: (info) => {
          return info.cell.getIsAggregated()
            ? `${info.getValue()} Items`
            : info.getValue();
        },
      },
      {
        header: "Name",
        accessorKey: "name",

        cell: (info) => {
          return info.cell.getIsAggregated()
            ? `${info.getValue()} (Aggregated)`
            : info.getValue();
        },
      },
      {
        header: "Category",
        accessorKey: "category",
        enableGrouping: true,

        cell: (info) => {
          return info.cell.getIsAggregated()
            ? `Category: ${info.getValue()}`
            : info.getValue();
        },
      },
      {
        header: "Subcategory",
        accessorKey: "subcategory",
        enableGrouping: true,
      },
      {
        header: "CreatedAt",
        accessorKey: "createdAt",
        aggregationFn: (values) => values[0],
        cell: (info) =>
          DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
      },
      {
        header: "UpdatedAt",
        accessorKey: "updatedAt",
        aggregationFn: (values) => values[0],
        cell: (info) =>
          DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) => {
          return info.cell.getIsAggregated()
            ? `Average Price: $${info.getValue()}`
            : `$${info.getValue().toFixed(2)}`;
        },
      },
      {
        header: "Sale Price",
        accessorKey: "sale_price",
        cell: (info) => {
          return info.cell.getIsAggregated()
            ? `Average Sale Price: $${info.getValue()}`
            : info.getValue()
            ? `$${info.getValue().toFixed(2)}`
            : "N/A";
        },
      },
    ],
    []
  );

  const [checkedColumns, setCheckedColumns] = useState({
    ID: true,
    Name: true,
    Category: true,
    Subcategory: true,
    CreatedAt: true,
    UpdatedAt: true,
    Price: true,
    "Sale Price": true,
  });

  // Filter columns based on the checked state
  const visibleColumns = useMemo(() => {
    return columns.filter((column) => {
      const columnHeader = column.header;
      return checkedColumns[columnHeader];
    });
  }, [checkedColumns, columns]);

  return (
    <AllProvider>
      <h1 className="mt-3 mb-3 d-flex justify-content-center">
        Tanstack-table
      </h1>
      <BasicTable data={data} columns={visibleColumns} />
      <Hide_Unhide
        checkedColumns={checkedColumns}
        setCheckedColumns={setCheckedColumns}
      />
      <Sort />
      <Filters />
      <Groups />
    </AllProvider>
  );
}

export default App;
