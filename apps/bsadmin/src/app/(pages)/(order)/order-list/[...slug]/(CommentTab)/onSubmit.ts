import { POST } from "api";
import { ScopedMutator } from "swr/_internal";

export const onSubmit = async (
  data: any,
  orderUkey: string | string[],
  mutate: ScopedMutator<any>,
  reset,
  resetField
) => {
  console.log("SUBMIT DATA", data);
  const sortEmailData = data.rcpnEmailList.map((item: any) => item.email);

  const bodyData = {
    cmntType: "ORDER",
    memo: data.memo,
    rcpnEmailList: sortEmailData.join(),
  };

  console.log("BODY DATA", bodyData);

  await POST(`/order/${orderUkey}/cmnt`, bodyData)
    .then((response) => {
      console.log("POST request successful:", response);
      if (response.success) {
        mutate(`/order/${orderUkey}/cmnt/list`);
      }
    })
    .catch((error) => {
      console.error("POST request failed:", error);
    })
    .finally(() => {
      resetField("memo");
    });
};
