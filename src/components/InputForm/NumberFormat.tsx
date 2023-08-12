import * as React from "react";
import { NumericFormat, PatternFormat } from "react-number-format";

import { useField } from "formik";

const NumberFormat = ({ name, ...otherProps }) => {

  const inputConfig = {
    // ...field,
    ...otherProps,
    // name: name,
    // thousandSeparator: ",",
    // allowNegative: false,
    // decimalScale: 3,
    // decimalSeparator: ".",
    // type:"number",
    // valueIsNumericString:true,
    // fixedDecimalScale: true,
    valueIsNumericString: true,
    thousandSeparator: true
  };

  return <NumericFormat  {...inputConfig} />;
};

export default NumberFormat;
