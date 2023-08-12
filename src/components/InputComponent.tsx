import React from "react";
import TextField from "@mui/material/TextField";
interface InputProps {
  label: string;
  type: string;
  isDisable: boolean;
  labelWidth: string;
  valueInput: number;
  handleChange: () => void;
}
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
