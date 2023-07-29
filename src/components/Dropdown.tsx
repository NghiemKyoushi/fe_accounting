"use client";
import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FieldHookConfig, useField } from "formik";

export interface DropDownProps {
  value: Number;
  items: Array<Object>;
  nameForm: string;
  label: string;
}
export interface itemProps {
  key: string;
  value: number;
}
const DropDown = (props: DropDownProps & FieldHookConfig<string>) => {
  const { value, items, label, nameForm } = props;
  const [field] = useField({ name: nameForm, value });
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
            alignItems: "flex-start",
          }}
        >
          {label}
        </label>
      )}
      <Select
        style={{ height: 39 }}
        defaultValue={value}
        {...field}
        // disableUnderline={true}
        IconComponent={ExpandMoreIcon}
      >
        {items.map((item: any) => (
          <MenuItem key={item.key} value={item.value}>
            {item.key}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DropDown;
