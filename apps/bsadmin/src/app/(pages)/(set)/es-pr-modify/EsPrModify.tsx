import React, { useState } from "react";
import useSWR from "swr";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import AnlsTypeMcVal from "./AnlsTypeMcVal";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";

const LazyCommontModifyLog = dynamic(
  () => import("../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

const EsPrModify = () => {
  const params = useParams();
  const { slug } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const uKey = searchParams.get("esPrMngUkey");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(`/mngr/esPrMng/${uKey}`, fetcher, {
    suspense: true,
  });
  console.log("sssssss", uKey);

  const defaultValues = {
    ...data,
  };

  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);
    //console.log("selectedMembers", selectedMembers);
    setIsLoading(true);

    ///mngr/esPrMng/{esPrMngUkey}
    let saveObj = {
      inclInfo: data.inclInfo,
      isUse: data.isUse,
      prNm: data.prNm,
    };
    console.log("==modify", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `/mngr/esPrMng/${uKey}`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        setIsLoading(false);
        router.push("/es-pr-list/" + uKey);
      } else if (response.code == "INVALID_AUTHORITY") {
        setIsLoading(false);
        toast("권한이 없습니다.");
      } else {
        setIsLoading(false);
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      setIsLoading(false);
      toast("문제가 발생했습니다. 02");
    } finally {
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="견적 품명 수정" />
        </Box>
        <Typography variant="subtitle1" sx={{ mt: 5 }}>
          기본 정보
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>분석종류</TH>
                <TD sx={{ width: "85%" }}>
                  {/*{getValues("anlsTypeMcVal")}*/}
                  <AnlsTypeMcVal />
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>품명</TH>

                <TD sx={{ width: "85%" }}>
                  <InputValidation
                    inputName="prNm"
                    required={true}
                    sx={{ width: 600 }}
                  />
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>메모</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <InputValidation
                    fullWidth={true}
                    multiline
                    rows={10}
                    inputName="inclInfo"
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Link href="/es-pr-list/">
            <OutlinedButton buttonName="목록" />
          </Link>

          {/*<ContainedButton buttonName="수정" type="submit" />*/}
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            저장
          </LoadingButton>
        </Stack>
      </Form>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog
            apiName="esPrMng"
            logTitle=""
            type="mngr"
            uKey={uKey}
          />
        </ErrorContainer>
      </Box>
    </>
  );
};

export default EsPrModify;
