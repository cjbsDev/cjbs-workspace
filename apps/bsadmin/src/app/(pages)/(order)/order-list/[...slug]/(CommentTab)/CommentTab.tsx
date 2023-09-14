import React, { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
import SubmitBtn from "./SubmitBtn";
import { useRecoilState, useRecoilValue } from "recoil";
import { mngEmailListAtom } from "../../../../../recoil/atoms/mngEmailListAtom";
import Memo from "./Memo";

const LazyCommentList = dynamic(() => import("./CommentList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const CommentTab = () => {
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resEamilList, setResEmailList] = useRecoilState(mngEmailListAtom);

  const onSubmit = async (data: any) => {
    console.log("SUBMIT DATA", data);
    setIsLoading(true);

    const sortEmailData = resEamilList.map((item) => item.email);

    const bodyData = {
      cmntType: "ORDER",
      memo: data.memo,
      rcpnEmailList: sortEmailData.join(),
    };

    console.log("BODY DATA", bodyData);

    try {
      const response = await POST(`/order/${orderUkey}/cmnt`, bodyData);
      console.log("POST request successful:", response);
      if (response.success) {
        // handleNestedReset();
        mutate(`/order/${orderUkey}/cmnt/list`);
        setResEmailList([]);
      }
    } catch (error) {
      console.error("POST request failed:", error);
    } finally {
      setIsLoading(false);
    }
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
                <Memo />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <SubmitBtn isLoading={isLoading} />
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
