import { fetcher } from "api";
import useSWR from "swr";
import { RadioGV } from "cjbsDSTM";

const PaymentType = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=tax invoice&midValue=payment`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("PaymentType List", data);

  return (
    <RadioGV
      data={data}
      inputName="pymtInfoCc"
      required={true}
      errorMessage="결제 타입을 선택해 주세요."
    />
  );
};

export default PaymentType;
