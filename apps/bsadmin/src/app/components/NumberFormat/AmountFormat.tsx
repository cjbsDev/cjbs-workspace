import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface AmountFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  priceValue: number;
}

const AmountFormat = React.forwardRef<NumericFormatProps, AmountFormatProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, priceValue, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        defaultValue={priceValue}
        thousandSeparator
        valueIsNumericString
      />
    );
  },
);

export default AmountFormat;
