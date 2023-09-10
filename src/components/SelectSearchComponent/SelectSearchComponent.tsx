import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, IconButton, Autocomplete } from "@mui/material";
import CustomInput from "./InputFormContent";
import {
  Control,
  Controller,
  UseFormSetValue,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
interface resultProps {
  key: string;
  values: string;
}
interface InputProps {
  name: string;
  nameOnChange: string;
  label?: string;
  type?: string;
  results?: Array<resultProps>;
  isDisable?: boolean;
  labelWidth?: string;
  placeHoder: string;
  control: Control;
  setValue: UseFormSetValue<any>;
}

function SelectSearchComponent(props: InputProps) {
  const {
    name,
    label,
    results,
    isDisable,
    labelWidth,
    placeHoder,
    control,
    nameOnChange,
    setValue,
  } = props;

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
            fontSize: 14,
            // alignItems: "flex-start",
          }}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, onBlur, value } = field;
          return (
            <Autocomplete
              options={results || []}
              getOptionLabel={(option) => {
                return option?.values ? option?.values : "";
              }}
              value={value ?? ""}
              
              // inputValue={ value[value] ?? value[value] ?? ""}
              onChange={(event, selectedOptions, reason) => {
                if (reason === "clear") {
                  onChange({}); // This onChange is from the Hook forms
                  return;
                }
                onChange(selectedOptions);
              }}
              onInputChange={(event, newInputValue) => {
                if (nameOnChange !== "") {
                  setValue(nameOnChange, newInputValue);
                }
              }}
              sx={{ width: `${labelWidth}%`, padding: "0px 32px 0px 0px" }}
              renderInput={(params) => (
                <CustomInput
                  {...params}
                  size="small"
                  label=""
                  placeholder={placeHoder}
                  width={"100%"}
                  disabled={isDisable}
                  type={"text"}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: name === "customerName" && <SearchIcon />,
                  }}
                />
              )}
            />
          );
        }}
      />
    </div>
  );
}

export default SelectSearchComponent;
