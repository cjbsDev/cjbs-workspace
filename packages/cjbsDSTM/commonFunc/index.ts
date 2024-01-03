export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatBusinessRegNo = (businessRegNo: string) => {
  if (!businessRegNo) return "";
  return businessRegNo.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";

  // 지역번호가 2자리인 경우 (예: 02-XXXX-XXXX)
  const twoDigitAreaCodeRegex = /^(\d{2})(\d{3,4})(\d{4})$/;

  // 지역번호가 3자리 또는 휴대전화 번호인 경우 (예: 031-XXXX-XXXX, 010-XXXX-XXXX)
  const threeDigitAreaCodeRegex = /^(\d{3})(\d{3,4})(\d{4})$/;

  if (twoDigitAreaCodeRegex.test(phoneNumber)) {
    return phoneNumber.replace(twoDigitAreaCodeRegex, "$1-$2-$3");
  } else if (threeDigitAreaCodeRegex.test(phoneNumber)) {
    return phoneNumber.replace(threeDigitAreaCodeRegex, "$1-$2-$3");
  }

  return phoneNumber; // 포맷에 맞지 않는 번호는 그대로 반환
};

export const transformedNullToHyphon = (resData) => {
  const transformedData = Object.keys(resData).reduce((result: any, key) => {
    result[key] = resData[key] !== null ? resData[key] : "-";
    return result;
  }, {});
  return transformedData;
};

export const validateAndFormatEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailRegex.test(email)) {
    return email.toLowerCase();
  }
  return ""; // or you can return false or throw an error based on your preference
};
