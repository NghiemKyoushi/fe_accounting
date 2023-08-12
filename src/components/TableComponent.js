/* eslint-disable react/jsx-key */
"use client";
import React from "react";
import { useTable, usePagination } from "react-table";
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: neutral[800],
    color: theme.palette.common.white,
    textAlign: "center",
    padding: "8px 8px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "5px 15px",
  },
}));
const StyledTable = styled(Table)(({ theme }) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    alignItem: "center",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableReactComponent(props) {
  const { columns, data, updateMyData, skipPageReset, editTable, pagination } =
    props;
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,

      // defaultColumn: editTable === false ? undefined : defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      // autoResetPage: !skipPageReset,
      // updateMyData,
    },
    usePagination
  );
  return (
    <React.Fragment>
      <TableContainer >
        <Table
          sx={{ width: "100%", overflowX: "auto", minWidth:800 }}
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
                </StyledTableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {footerGroups.map((group) => (
              <StyledTableRow {...group.getFooterGroupProps()}>
                {group.headers.map((column) => (
                  <StyledTableCell {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableFooter>
        </Table>
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
                  {" "}
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

function TableComponent(props) {
  const { editTable, data, columns, pagination } = props;
  return (
    <>
      <TableReactComponent
        editTable={editTable}
        columns={columns}
        data={data}
        pagination={pagination}
      />
    </>
  );
}

export default TableComponent;
