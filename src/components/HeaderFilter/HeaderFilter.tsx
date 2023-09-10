// import DateRangePickerCustom from "../DateRangePickerCustom";
import styles from "./HeaderFilter.module.scss";
import DropDown from "../Dropdown";
import React, { FunctionComponent, useState } from "react";
import {
  InputAdornment,
  TextField,
 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
function HeaderFilter() {
  return (
    <div className={styles.filter__container}>
      <div></div>
      <div></div>

      {/* <TextField
        size="small"
        variant="outlined"
        // onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              // style={{ display: showClearIcon }}
              // onClick={handleClick}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      /> */}
      {/* <DropDown
        nameForm={"category"}
        label=""
        placeHolder="Phân Loại"
        value={""}
        items={[
          { key: "THU", value: 1 },
          { key: "CHI", value: 2 },
          { key: "CÔNG NỢ", value: 3 },
          { key: "THU NỢ", value: 4 },
        ]}
      />
      <DropDown
        nameForm={"provisions"}
        label=""
        placeHolder="Định Khoản"
        value={""}
        items={[
          { key: "ĐẢO RÚT", value: 1 },
          { key: "TẠM ỨNG", value: 2 },
          { key: "CÔNG NỢ", value: 3 },
          { key: "THU NỢ", value: 4 },
        ]}
      /> */}
      {/* <DateRangePickerCustom /> */}
    </div>
  );
}

export default HeaderFilter;
