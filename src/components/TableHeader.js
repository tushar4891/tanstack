import React from "react";
import { IoIosClose } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { CgSortAz } from "react-icons/cg";

import { LuArrowUpDown } from "react-icons/lu";

import "./TableHeader.css";

const TableHeader = ({ filtering, setFiltering }) => {
  return (
    <div className="d-flex justify-content-end  gap-3 me-auto mb-3">
      <div className="search-box">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="  Search"
        />
        {filtering && (
          <IoIosClose className="close-icon" onClick={() => setFiltering("")} />
        )}
      </div>
      <FiEye
        style={{ height: "20px", width: "20px" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
      />
      <LuArrowUpDown
        style={{ height: "25px", width: "25px" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSort"
      />
      <HiOutlineSquare3Stack3D
        style={{ height: "25px", width: "25px" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasFilters"
      />
      <CgSortAz
        style={{ height: "25px", width: "25px" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasGroups"
      />
    </div>
  );
};

export default TableHeader;
