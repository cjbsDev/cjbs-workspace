import React, { useState, useMemo, useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { DELETE, fetcher, PUT } from "api";
import { useParams } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { cjbsTheme, Form, InputValidation, OutlinedButton } from "cjbsDSTM";
import { toast } from "react-toastify";
import CommentModify from "./CommentModify";

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
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mt: 0.6 }}>
          코멘트
        </Typography>
        <Box>
          총
          <Box
            component="span"
            sx={{
              color: cjbsTheme.palette.primary.main,
              fontSize: 18,
              fontWeight: 600,
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
          } = item;
          return (
            <Box
              key={totalCmntUkey}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: cjbsTheme.palette.grey["300"],
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1">
                  {writerNm}({writerDepartVal})
                </Typography>
                <Stack
                  direction="row"
                  divider={<Typography variant="body2">|</Typography>}
                  spacing={0.5}
                  sx={{ color: cjbsTheme.palette.grey["600"] }}
                >
                  <Typography variant="body2">작성일 {createdDttm}</Typography>
                  <Typography variant="body2">
                    최종 수정일 {modifiedDttm === null ? "-" : modifiedDttm}
                  </Typography>
                </Stack>

                <Box>
                  <Stack direction="row">
                    <OutlinedButton
                      buttonName="수정"
                      onClick={() => handleCommentModify(index)}
                    />
                    <LoadingButton
                      loading={isLoading[index]}
                      variant="outlined"
                      size="small"
                      onClick={() => handleCommentDelete(totalCmntUkey, index)}
                    >
                      삭제
                    </LoadingButton>
                  </Stack>
                </Box>
              </Stack>

              <Box>
                <Typography variant="subtitle2">
                  To. {rcpnNmList.join(", ")}
                  {/*{item.rcpnNmList.map((item) => item)}*/}
                </Typography>

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
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {memo}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default CommentList;
