"use client";
import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useFormContext } from "react-hook-form";
import { OutlinedButton } from "cjbsDSTM";

const scriptUrl =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
const PostCodeBtn = () => {
  const { setValue } = useFormContext();
  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data: {
    address: any;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: number;
  }) => {
    console.log("Post code data ==>>", data);
    let fullAddress = data.address;
    let zip = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log("fullAddress", fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setValue("zip", zip);
    setValue("addr", fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <OutlinedButton
      size="small"
      buttonName="우편번호 찾기"
      onClick={handleClick}
    />
  );
};

export default PostCodeBtn;
