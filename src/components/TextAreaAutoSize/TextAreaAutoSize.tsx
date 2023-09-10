import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
interface State<T extends FieldValues> extends UseControllerProps<T> {
  textFieldProps?: StandardTextFieldProps;
  valueInput: string;
  // name: string;
  label: string;
  width: string;
  type: string;
  disable: boolean;
  // control: Control<T>;
}
const TextareaComponent = <T extends FieldValues>({
  textFieldProps,
  valueInput,
  // name,
  label,
  width,
  disable,
  type,
  ...other
}: State<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(other);

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
        <label style={{ fontWeight: "bolder", width: 110 }}>{label}</label>
      )}
      <div
        style={{
          width: "70%",
          padding: "0px 0px",
          margin: "1px 15px",
          backgroundColor: "transparent",
        }}
      >
        <TextField
          {...textFieldProps}
          {...field}
          maxRows={4}
          style={{
            width: "100%",
            padding: "0px 0px",
            margin: "3px 0px",
            backgroundColor: "transparent",
          }}
          InputProps={{
            ...textFieldProps?.InputProps,
            rows: 5,
            inputComponent: TextareaAutosize,
          }}
          placeholder="nhập diễn giải tại dây"
        />
        {/* )}
        /> */}
      </div>
    </div>
  );
};
export default TextareaComponent;
