import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  SkeletonLoading,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
import MngInput from "./MngInput";
import { POST } from "api";
import { useParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";

const LazyCommentList = dynamic(() => import("./CommentList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const CommentTab = () => {
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const methods = useForm();

  const handleNestedReset = () => {
    // 중첩된 컴포넌트에 대한 참조를 얻습니다.
    const nestedComponentMethods = methods.getValues({ nest: true });

    // 중첩된 컴포넌트의 필드를 리셋합니다.
    nestedComponentMethods.memo = "";

    // 중첩된 컴포넌트의 값을 다시 설정합니다.
    // methods.setValue("nestedComponentFieldName", nestedComponentMethods);
  };
  const onSubmit = async (data: any) => {
    console.log("SUBMIT DATA", data);

    const sortEmailData = data.rcpnEmailList.map((item) => item.email);

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
          handleNestedReset();
          mutate(`/order/${orderUkey}/cmnt/list`);
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
      })
      .finally(() => {});
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <Box sx={{ mb: 1 }}>
                <MngInput />
              </Box>
              <Box>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={2}
                  inputName="memo"
                  placeholder="내용을 입력해 주세요."
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                  required={true}
                  errorMessage="코멘트를 입력하세요."
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <ContainedButton
                buttonName="등록"
                type="submit"
                fullWidth
                sx={{ height: 122 }}
              />
            </Grid>
          </Grid>
        </Form>
      </Box>

      {/* LIST */}
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyCommentList />
      </ErrorContainer>
    </>
  );
};

export default CommentTab;
