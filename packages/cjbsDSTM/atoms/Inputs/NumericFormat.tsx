import React from "react";
import { NumericFormat as OriginalNumericFormat } from "react-number-format";
import { InputPriceType } from "./index";

const NumericFormat = React.forwardRef((props, ref) => (
  <OriginalNumericFormat {...props} customInput={InputPriceType} ref={ref} />
));

export default NumericFormat;
