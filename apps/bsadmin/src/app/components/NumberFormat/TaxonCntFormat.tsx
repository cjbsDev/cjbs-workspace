import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface TaxonTypeProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  taxonData: number;
}

const TaxonCntFormat = React.forwardRef<NumericFormatProps, TaxonTypeProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, taxonData, ...other } = props;

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
        // defaultValue={
        //   orshExtrData === "NO_DATA" ? 0 : orshExtrData.orderInfo.taxonBCnt
        // }
        // displayType="text"
        defaultValue={taxonData}
        thousandSeparator
        valueIsNumericString
      />
    );
  },
);

export default TaxonCntFormat;
