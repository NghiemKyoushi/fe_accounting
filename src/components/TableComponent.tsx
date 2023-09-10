/* eslint-disable react/jsx-key */
"use client";
import React from "react";
import { useTable, usePagination, useExpanded } from "react-table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableFooter,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { neutral } from "@/theme/colors";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useForm } from "react-hook-form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#edeef2",
    color: "#151114",
    textAlign: "center",
    padding: "6px 6px",
    fontSize: 13,
    border: "10px solid #d4d9d6",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "5px 15px",
  },
}));
const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    border: "1px solid #d4d9d6",
  },
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffffff",
    alignItem: "center",
    border: "1px solid #d4d9d6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: "1px solid #d4d9d6",
  },
}));

export interface TableComponentProps {
  columns: Array<any>;
  data: Array<any>;
  pagination: boolean;
  isFooter: boolean;
}
function TableReactComponent(props: TableComponentProps) {
  const {
    columns,
    data,
    // skipPageReset,
    pagination,
    // renderRowSubComponent,
    isFooter,
  } = props;
  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { expanded: { 0: true } },
      // defaultColumn: editTable === false ? undefined : defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      // autoResetPage: !skipPageReset,
      // updateMyData,
    },
    useExpanded,
    usePagination
  );
  return (
    <React.Fragment>
      <TableContainer>
        <StyledTable
          sx={{ width: "100%", overflowX: "auto", minWidth: 800 }}
          size="small"
          aria-label="customized table"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledTableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <StyledTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <StyledTableCell align="center" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </StyledTableCell>
                    );
                  })}
                  {/* {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null} */}
                </StyledTableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {isFooter &&
              footerGroups.map((group) => (
                <StyledTableRow {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <StyledTableCell {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableFooter>
        </StyledTable>
      </TableContainer>
      {pagination && (
        <div
          className="pagination"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              // label="page"
              sx={{ width: 70, height: 33 }}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 15, 20, 25, 30].map((pageSize) => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "} */}
          <IconButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>{" "}
          <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
            <KeyboardArrowRightIcon />
          </IconButton>{" "}
          {/* <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "} */}
          <div style={{ width: 110 }}>
            Page
            {/* <strong> */}
            {pageIndex + 1} of {pageOptions.length}
            {/* </strong> */}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
function TableComponent(props: TableComponentProps) {
  const { data, columns, pagination, isFooter } = props;
  return (
    <>
      <TableReactComponent
        columns={columns}
        data={data}
        isFooter={isFooter}
        pagination={pagination}
      />
    </>
  );
}

export default TableComponent;
