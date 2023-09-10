"use client";
import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UseFormRegister, FieldValues } from "react-hook-form";

import { Control, Controller, Path } from "react-hook-form";

// export interface DropDownProps {
//   value: string;
//   items: Array<itemProps>;
//   nameForm: string;
//   label: string;
//   placeHolder: string;
//   register: UseFormRegister<FieldValues>;
// }
export interface itemProps {
  key: string;
  value: number | string;
}
export type MySelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: React.ReactNode;
  control: Control<T>;
  items?: Array<itemProps>;
} & SelectProps;
const DropDown = <T extends FieldValues>(props: MySelectProps<T>) => {
  // const { value, items, label, register, nameForm, placeHolder } = props;
  const { control, name, label, items, ...render } = props;

  const menuitems = items
    ? items.map((item: any) => (
        <MenuItem sx={{ fontSize: 13 }} key={item.key} value={item.value}>
          {item.key}
        </MenuItem>
      ))
    : undefined;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {label !== "" && (
        <label
          style={{
            fontWeight: "bolder",
            width: 110,
            fontSize: 14,
          }}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl
            sx={{ width: "70%", padding: "0px 6px", margin: "1px 10px" }}
          >
            <InputLabel
              style={{ fontSize: 12 }}
              id="demo-simple-select-autowidth-label"
            >
              {/* {placeHolder} */}
            </InputLabel>
            <Select
              style={{
                width: "100%",
                height: 39,
                fontSize: 12,
                padding: "2px 10px",
                backgroundColor: "transparent",
              }}
              {...field}
              {...render}
              // value={value}
              IconComponent={ExpandMoreIcon}
              inputProps={{ id: "myselect" }}
              // label={placeHolder}
            >
              {menuitems}
              {/* {items.map((item: any) => (
                <MenuItem
                  sx={{ fontSize: 13 }}
                  key={item.key}
                  value={item.value}
                >
                  {item.key}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
};

export default DropDown;
