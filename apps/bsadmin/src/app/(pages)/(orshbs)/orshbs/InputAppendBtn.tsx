import React from "react";
import { InputValidation } from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";

const InputAppendBtn = () => {
  const { watch, control, getValues } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "items", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const handleAddFields = (count) => {
    console.log("Count~!~!", count);
    for (let i = 0; i < count; i++) {
      append({ name: "" }); // 입력된 수만큼 항목을 추가합니다.
    }
  };
  return (
    <>
      <InputValidation inputName="count" type="number" />
      <button type="button" onClick={() => handleAddFields(getValues("count"))}>
        항목 추가
      </button>

      {fields.map((field, index) => {
        console.log("field", field);
        return (
          <div key={field.id}>
            <InputValidation inputName={`items[${index}].name`} />
          </div>
        );
      })}
    </>
  );
};

export default InputAppendBtn;
