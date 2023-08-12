import React from "react";
import TextField from "@mui/material/TextField";
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
        padding: "0px 6px",
        margin: "1px 10px",
        backgroundColor: "transparent",
      }}
      id={props.name}
      {...props}
    />
  );
};

export default CustomInput;
