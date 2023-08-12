import { TextField, TextFieldProps } from "@mui/material";
import { NumberFormatValues, NumericFormat } from "react-number-format";

export type NumberFieldProps = Omit<
  TextFieldProps,
  "type" | "value" | "InputProps"
> & {
  value: number;
  onValueChange?: (values: NumberFormatValues) => void;
  allowNegative?: boolean;
  decimalScale?: number;
  InputProps?: Omit<TextFieldProps["InputProps"], "inputComponent">;
};

const NumberFormatCustom = (props: any) => {
  const { inputRef, onValueChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={onValueChange}
      thousandSeparator={"."}
      decimalSeparator={","}
    />
  );
};

const NumberField: React.FunctionComponent<NumberFieldProps> = (props) => {
  const {
    inputProps,
    InputProps,
    onValueChange,
    allowNegative,
    decimalScale,
    ...rest
  } = props;

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
        // width: `${props.width}`,
        padding: "0px 6px",
        margin: "1px 10px",
        backgroundColor: "transparent",
      }}
      inputProps={{
        ...inputProps,
        onValueChange: onValueChange,
        allowNegative: allowNegative,
        decimalScale: decimalScale,
      }}
      InputProps={{
        ...InputProps,
        inputComponent: NumberFormatCustom,
      }}
      {...rest}
    />
  );
};
export default NumberField;
