import React, { useState, useMemo, useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { DELETE, fetcher, PUT } from "api";
import { useParams } from "next/navigation";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  cjbsTheme,
  Form,
  InputValidation,
  LinkButton,
  OutlinedButton,
} from "cjbsDSTM";
import { toast } from "react-toastify";
import CommentModify from "./CommentModify";
import MyIcon from "icon/MyIcon";

const CommentList = () => {
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const APIPATH = `/order/${orderUkey}/cmnt/list`;
  const { data } = useSWR(APIPATH, fetcher, {
    suspense: true,
  });
  console.log("COMMENT LIST", data);
  const comntTotal = data.length;
  const [isLoading, setIsLoading] = useState<boolean[]>(
    new Array(comntTotal).fill(false)
  );
  const [isModifyShow, setIsModifyShow] = useState<boolean[]>(
    new Array(comntTotal).fill(false)
  );

  const handleCommentDelete = useCallback((totalCmntUkey, index) => {
    const APIPATH_DELETE = `/order/${orderUkey}/cmnt/${totalCmntUkey}`;
    setIsLoading((prev) => [
      ...prev.slice(0, index),
      true,
      ...prev.slice(index + 1),
    ]);
    DELETE(APIPATH_DELETE)
      .then((res) => {
        if (res.success) {
          mutate(APIPATH);
          toast("삭제 되었습니다.");
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading((prev) => [
          ...prev.slice(0, index),
          false,
          ...prev.slice(index + 1),
        ]);
      });
  }, []);

  const handleCommentModify = useCallback((index) => {
    console.log("Modify Index", index);
    setIsModifyShow((prev) => [
      ...prev.slice(0, index),
      true,
      ...prev.slice(index + 1),
    ]);
  }, []);

  const handleCommentModifyCancel = useCallback((index) => {
    console.log("Modify Index", index);
    setIsModifyShow((prev) => [
      ...prev.slice(0, index),
      false,
      ...prev.slice(index + 1),
    ]);
  }, []);

  // const onSubmit = (data: any) => {
  //   console.log("MODIFY DATA", data);
  //
  //   const APIPATH_MODIFY = `/order/${orderUkey}/cmnt/${totalCmntUkey}`;
  //   PUT(APIPATH_MODIFY);
  // };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="subtitle1" sx={{ mt: 0.4 }}>
          코멘트
        </Typography>
        <Box>
          총
          <Box
            component="span"
            sx={{
              color: cjbsTheme.palette.primary.main,
              fontSize: 16,
              fontWeight: 600,
              mx: 0.3,
            }}
          >
            {comntTotal}
          </Box>
          건
        </Box>
      </Stack>

      <Box>
        {data.map((item, index) => {
          const {
            totalCmntUkey,
            writerNm,
            writerDepartVal,
            createdDttm,
            modifiedDttm,
            rcpnNmList,
            memo,
            cmntType,
          } = item;
          return (
            <Box
              key={totalCmntUkey}
              sx={{
                mb: 3.8,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1">
                    {writerNm}({writerDepartVal})
                  </Typography>
                  <Stack
                    direction="row"
                    divider={<Typography variant="body2">|</Typography>}
                    spacing={0.5}
                    sx={{ color: cjbsTheme.palette.grey["600"] }}
                  >
                    <Typography variant="body2">
                      작성일 {createdDttm}
                    </Typography>

                    {modifiedDttm !== null && (
                      <Typography variant="body2">
                        최종 수정일 {modifiedDttm}
                      </Typography>
                    )}
                  </Stack>
                </Stack>

                <Box>
                  <Stack direction="row">
                    <LinkButton
                      size="small"
                      buttonName="수정"
                      sx={{ color: "black" }}
                      startIcon={<MyIcon icon="pen-fill" size={20} />}
                      onClick={() => handleCommentModify(index)}
                    />

                    <LinkButton
                      size="small"
                      buttonName="삭제"
                      sx={{ color: "black" }}
                      startIcon={<MyIcon icon="trash" size={20} />}
                      onClick={() => handleCommentDelete(totalCmntUkey, index)}
                    />
                    {/*<OutlinedButton*/}
                    {/*  buttonName="수정"*/}
                    {/*  onClick={() => handleCommentModify(index)}*/}
                    {/*/>*/}
                    {/*<LoadingButton*/}
                    {/*  loading={isLoading[index]}*/}
                    {/*  variant="outlined"*/}
                    {/*  size="small"*/}
                    {/*  onClick={() => handleCommentDelete(totalCmntUkey, index)}*/}
                    {/*>*/}
                    {/*  삭제*/}
                    {/*</LoadingButton>*/}
                  </Stack>
                </Box>
              </Stack>

              <Box
                sx={{
                  p: 2.3,
                  border: `1px solid ${cjbsTheme.palette.primary.main}`,
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              >
                <Grid container>
                  <Grid item xs={0.6}>
                    <Stack
                      sx={{
                        backgroundColor: cjbsTheme.palette.primary.main,
                        width: 60,
                        height: 60,
                        color: "white",
                        borderRadius: 2.5,
                      }}
                      alignItems="center"
                      justifyContent="center"
                      spacing={0.2}
                    >
                      <MyIcon icon="order" size={17} />
                      <Typography variant="subtitle2">
                        {cmntType === "ORDER" && "오더"}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={11.4}>
                    <Typography variant="subtitle2">
                      To. {rcpnNmList.join(", ")}
                      {/*{item.rcpnNmList.map((item) => item)}*/}
                    </Typography>
                    <Divider sx={{ my: 1.2 }} />

                    {isModifyShow[index] ? (
                      <Box>
                        <CommentModify
                          totalCmntUkey={totalCmntUkey}
                          memo={memo}
                          index={index}
                          onModifyCancel={handleCommentModifyCancel}
                        />
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {memo}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default CommentList;
