import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { cjbsTheme, Form } from "cjbsDSTM";
import MngAddList from "./MngAddList";
import Memo from "./Memo";
import SubmitBtn from "./SubmitBtn";
import { POST } from "api";
import { useParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { useRecoilState } from "recoil";
import { mngEmailListAtom } from "../../../../../recoil/atoms/mngEmailListAtom";

const CommentWrite = () => {
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
    <Box
      sx={{
        mb: 5,
        mt: -5,
        p: 3.8,
        backgroundColor: cjbsTheme.palette.grey["50"],
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        코멘트 작성
      </Typography>
      <Form onSubmit={onSubmit}>
        <Grid container spacing={1.5}>
          <Grid item xs={10.8}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={0.5}>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      담당자
                    </Typography>
                  </Grid>
                  <Grid item xs={11.5}>
                    <Box sx={{ mb: 1 }}>
                      <MngAddList />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={0.5}>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      내용
                    </Typography>
                  </Grid>
                  <Grid item xs={11.5}>
                    <Box>
                      <Memo />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1.2}>
            <SubmitBtn isLoading={isLoading} />
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

export default CommentWrite;
