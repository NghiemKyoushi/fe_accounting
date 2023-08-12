import React from "react";
import { useFormikContext, useField } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, IconButton, Autocomplete } from "@mui/material";
import CustomInput from "./InputFormContent";
import NumberFormat from "./NumberFormat";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface resultProps {
  key: string;
  value: string;
}
interface InputProps {
  name?: string;
  label?: string;
  type?: string;
  search?: boolean;
  results?: Array<resultProps>;
  isDisable?: boolean;
  labelWidth?: string;
  placeHoder: string;
  handleChangeType: (valueType: string, keyType: string) => void;
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
    handleChangeType,
  } = props;
  const [field] = useField({ name });
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
          options={results || []}
          getOptionLabel={(option) => option.value}
          onChange={(e, valueChange) => {
            if (name === "customerName") {
              setFieldValue("customerName", valueChange?.value || "");
              setFieldValue("customerId", valueChange?.key || "");
            } else if(name === "typeOfCard"){
              setFieldValue("typeOfCard", valueChange?.value || "");
              setFieldValue("typeOfCardId", valueChange?.key || "");
            } else{
                if (valueChange?.value) {
                handleChangeType(valueChange?.value, valueChange?.key);
              }
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
          {...field}
          // type={type}
          width={"80%"}
          InputProps={{
            inputComponent: NumberFormat as any,
          }}
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
