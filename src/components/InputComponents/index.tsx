import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        // onValueChange={(values) => {
        //   onChange({
        //     target: {
        //       name: props.name,
        //       value: values.value,
        //     },
        //   });
        // }}
        thousandSeparator={","}
        // decimalSeparator={"."}
      />
    );
  }
);

interface State {
  valueInput: string;
  nameInput: string;
  label: string;
  width: string;
  type: string;
  disable: boolean;
}

export default function FormattedInputs(props: State) {
  const { valueInput, nameInput, label, width, disable, type } = props;
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
      {label !== undefined && (
        <label
          style={{ fontWeight: "bolder", width: 110, fontSize:14 }}
        >
          {label}
        </label>
      )}
      <TextField
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
          
        }}
        // disabled={props.disabled}
        size="small"
        style={{
          width: `${width}`,
          // width: `${props.width}`,
          padding: "0px 6px",
          margin: "1px 10px",
          backgroundColor: "transparent",
        }}
        value={valueInput}
        name={nameInput}
        id="formatted-valueInput-input"
        disabled={disable}
        InputProps={{
          inputComponent: type=='number' ? NumericFormatCustom as any : null,
        }}
      />
    </div>
  );
}
