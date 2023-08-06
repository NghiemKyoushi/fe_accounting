import React from "react";
import { useFormikContext, useField } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";
import { InputAdornment, IconButton, Autocomplete } from "@mui/material";
const CustomInput = (props) => {
  return (
    <TextField
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#000000",
        },
      }}
      disabled={props.disabled}
      size="small"
      style={{
        width: `${props.width}`,
        // height: 60,
        padding: "0px 6px",
        margin: "1px 10px",
        // boxSizing: "border-box",
        // alignItems: "flex-end",
        backgroundColor: "transparent",
      }}
      id={props.name}
      name={props.name}
      type={props.type}
      {...props}
    />
  );
};
const formatMoney = (value: number) => {
  const VND = new Intl.NumberFormat("vi-VN", {});
  return VND.format(value);
};
interface InputProps {
  name?: string;
  label?: string;
  type?: string;
  search?: boolean;
  results?: Array<any>;
  isDisable?: boolean;
  labelWidth?: string;
  placeHoder: string;
  handleChangePos: (valuePos: string, keyPos: string)=> void;
}
function Input(props: InputProps) {
  const {
    name,
    label,
    type,
    search,
    results,
    isDisable,
    labelWidth,
    placeHoder,
    handleChangePos
  } = props;
  const [field, value] = useField({ name });
  const { setFieldValue } = useFormikContext();
  if (search) {
    return (
      <div
        className="field"
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
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <Autocomplete
          id="combo-box-demo"
          options={results}
          getOptionLabel={(option) => option.value}
          onChange={(e, value) => {
            console.log("VALUE", value)
            if (name === "customerName") {
              setFieldValue("customerName", value?.value || "");
              setFieldValue("customerId", value?.key || "");
            }else{
              handleChangePos(value?.value, value?.key)
            }
          }}
          sx={{ width: `${labelWidth}%`, padding: "0px 32px 0px 0px" }}
          renderInput={(params) => (
            <CustomInput
              {...params}
              {...field}
              size="small"
              label=""
              placeholder={placeHoder}
              width={"100%"}
              disabled={isDisable}
              // InputProps={{
              //   ...params.InputProps,
              //   endAdornment: name === "customerName" && <SearchIcon />,
              //   // disableUnderline: true,
              // }}
            />
          )}
        />
      </div>
    );
  }
  if (label) {
    return (
      <div
        className="field"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label
          style={{ fontWeight: "bolder", width: 110, alignItems: "flex-start" }}
          htmlFor={name}
        >
          {label}
        </label>
        <CustomInput
          disabled={isDisable}
          type={type}
          {...field}
          width={labelWidth}
        />
      </div>
    );
  }
  return (
    <>
      {type === "number" ? (
        <CustomInput
          disabled={isDisable}
          {...field}
          type={type}
          width={"80%"}
        />
      ) : (
        <CustomInput
          disabled={isDisable}
          {...field}
          type={type}
          width={"80%"}
        />
      )}
    </>
  );
}

export default Input;
