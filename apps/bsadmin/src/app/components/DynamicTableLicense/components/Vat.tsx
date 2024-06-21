import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { InputValidation } from "cjbsDSTM";

interface VatProps {
  fieldName: string;
  index: number;
}

const Vat = ({ fieldName, index }: VatProps) => {
  const { control, setValue } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  console.log("Vat sdfsdf", productValue);
  const vatValue = Math.round(productValue[index].supplyPrice * 0.1);
  console.log("vatValue%%%%%%%%%%", vatValue);
  useEffect(() => {
    setValue(`${fieldName}[${index}].vat`, vatValue);
  }, [setValue, vatValue]);
  return (
    <>
      <InputValidation
        inputName={`${fieldName}[${index}].vat`}
        disabled={true}
      />
    </>
  );
};

export default Vat;
