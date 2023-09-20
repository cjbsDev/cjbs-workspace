import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, InputValidation, OutlinedButton } from "cjbsDSTM";
import { PUT } from "api";
import { useParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";

const CommentModify = (props) => {
  const { totalCmntUkey, memo, onModifyCancel, index } = props;
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const defaultValues = {
  //   memo: memo,
  // };

  const onSubmit = (data: any) => {
    console.log("MODIFY DATA", data);
    setIsLoading(true);

    const APIPATH_MODIFY = `/order/${orderUkey}/cmnt/${totalCmntUkey}`;
    const bodyData = {
      memo: data.memo,
    };
    PUT(APIPATH_MODIFY, bodyData).then((res) => {
      console.log(res);
      if (res.success) {
        mutate(`/order/${orderUkey}/cmnt/list`);
        toast("수정 되었습니다.");
        onModifyCancel(index);
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <InputValidation
          fullWidth={true}
          multiline
          rows={2}
          inputName="memo"
          placeholder="내용을 입력해 주세요."
          maxLength={500}
          maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
          // required={true}
          // errorMessage="코멘트를 입력하세요."
          defaultValue={memo}
          sx={{ mb: 1 }}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {/*<OutlinedButton buttonName="확인" type="submit" size="small" />*/}
          <LoadingButton
            loading={isLoading}
            variant="outlined"
            size="small"
            type="submit"
          >
            확인
          </LoadingButton>
          <OutlinedButton
            buttonName="취소"
            color="secondary"
            sx={{ color: "black" }}
            size="small"
            onClick={() => onModifyCancel(index)}
          />
        </Stack>
      </Form>
    </>
  );
};

export default CommentModify;
