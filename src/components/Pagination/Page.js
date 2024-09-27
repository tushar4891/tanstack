import React from "react";

export const Page = ({ table }) => {
  const rowsCount = table.getRowModel().rows.length; // Get the number of rows

  // If there are no rows, do not render the pagination
  if (rowsCount === 0) {
    return null;
  } else {
    console.log("row count ", rowsCount);
  }

  return (
    <div className="mt-4 mb-5 d-flex justify-content-center align-items-center gap-3">
      <button onClick={() => table.setPageIndex(0)}>First page</button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        Previous page
      </button>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        Next page
      </button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Last page
      </button>
    </div>
  );
};
