import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
// import { InputAdornment, IconButton, Autocomplete } from "@mui/material";
const CustomInput = (props) => {
  return (
    <TextField
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#000000",
        },
      }}
      onChange={props.handleChange}
      disabled={props.disabled}
      size="small"
      style={{
        width: `${props.width}`,
        padding: "0px 6px",
        margin: "1px 10px",
        backgroundColor: "transparent",
      }}
      id={props.name}
      name={props.name}
      type={props.type}
      {...props}
    />
  );
};
interface InputProps {
  label: string;
  type: string;
  isDisable: boolean;
  labelWidth: string;
  valueInput: number;
  handleChange: () => void;
}
function InputComponent(props: InputProps) {
  const { label, type, valueInput, isDisable, labelWidth } = props;
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
        >
          {label}
        </label>
        <CustomInput
          disabled={isDisable}
          type={type}
          value={valueInput}
          width={labelWidth}
        />
      </div>
    );
  }
  return (
    <CustomInput
      disabled={isDisable}
      value={valueInput}
      type={type}
      width={"80%"}
    />
  );
}

export default InputComponent;
