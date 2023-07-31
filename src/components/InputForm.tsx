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
      // placeholder={props.placeHoder}
      id={props.name}
      name={props.name}
      type={props.type}
      {...props}
    />
  );
};


function NumberFormatCustom(props) {
  const { ...other } = props;

  return (
    <NumberFormat
      thousandSeparator
      // isNumericString
    />
  );
}
interface InputProps {
  name: string;
  label: string;
  type: string;
  search: boolean;
  results: Array<any>;
  isDisable: boolean;
  labelWidth: string;
}
function Input(props: InputProps) {
  const { name, label, type, search, results, isDisable, labelWidth } = props;
  const [field] = useField({ name });
  const { setFieldValue, handleBlur } = useFormikContext();
  if (search) {
    return (
      <div
        className="field"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
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
        <Autocomplete
          id="combo-box-demo"
          options={results}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) =>
            setFieldValue("customerName", value?.name || "")
          }
          sx={{ width: "30%", padding: "0px 32px 0px 0px" }}
          renderInput={(params) => (
            <CustomInput
              {...params}
              size="small"
              label=""
              placeholder="tìm kiếm chủ thẻ"
              width={"100%"}
              disabled={isDisable}
              InputProps={{
                ...params.InputProps,
                endAdornment: <SearchIcon />,
                // disableUnderline: true,
              }}
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
          // InputProps={{
          //   inputComponent: NumberFormatCustom
          // }}
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
