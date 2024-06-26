"use client";

import React from "react";
import { Fallback, ErrorContainer } from "cjbsDSTM";
import SkeletonLoading from "../../../components/SkeletonLoading";
import dynamic from "next/dynamic";

const LazySvcCateAdd = dynamic(() => import("./SvcCateAdd"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function SvcCatePage() {
  // init SRVC_CTGR
  // const enumMngrCode = "SRVC_CTGR";
  // const router = useRouter();

  // load
  // const {
  //   data: codeData,
  //   error,
  //   isLoading,
  // } = useSWR(`/mngr/add?enumMngrCode=${enumMngrCode}`, fetcher, {
  //   revalidateOnFocus: true,
  // });
  // if (isLoading) {
  //   return <SkeletonLoading />;
  // }

  //console.log("codeData", codeData);

  // const onSubmit = (data: any) => {
  //   console.log("data", data);
  //   const selectCodeList = data["btmCodeMcList"];
  //   if (selectCodeList.length <= 0) {
  //     toast("분석 방법을 선택해주세요.");
  //     return;
  //   }
  //   if (!data.topCodeMc) {
  //     toast("분류를 선택해주세요.");
  //     return;
  //   }
  //   if (!data.midCodeMc) {
  //     toast("분석 종류를 선택해주세요.");
  //     return;
  //   }
  //
  //   //toast(response.data.message ?? "에러 발생");
  //
  //   let saveObj = {
  //     btmCodeMcList: selectCodeList,
  //     midCodeMc: data.midCodeMc,
  //     topCodeMc: data.topCodeMc,
  //   };
  //   //console.log("saveObj", saveObj);
  //   console.log("modify stringify", JSON.stringify(saveObj));
  //   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr?enumMngrCode=${enumMngrCode}`; // Replace with your API URL
  //
  //   axios
  //     .post(apiUrl, saveObj)
  //     .then((response) => {
  //       console.log("request successful:", response.data);
  //       if (response.data.success) {
  //         toast("등록 성공");
  //         router.push("/svc-cate-list/");
  //       } else {
  //         toast(response.data.message ?? "에러 발생");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("request failed:", error);
  //       toast("[SVC-CATE-ADD]500 에러 발생");
  //     });
  // };

  // const defaultValues = {};

  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazySvcCateAdd />
    </ErrorContainer>
    // <Container maxWidth={false} sx={{ width: "100%" }}>
    //   <Box sx={{ mb: 4 }}>
    //     <Title1 titleName="서비스 분류 등록" />
    //   </Box>
    //   <Form onSubmit={onSubmit} defaultValues={defaultValues}>
    //     {/* key={formKey} 마스터 코드 - 상세 코드 컴포넌트 */}
    //     <TableContainer sx={{ mb: 5 }}>
    //       <Table>
    //         <TableBody>
    //           <TableRow>
    //             <TH sx={{ width: "252px" }}>분류</TH>
    //             <TD>
    //               {/* 라디오 */}
    //               <Stack direction="row">
    //                 <LazyRadioboxList
    //                   inputName="topCodeMc"
    //                   dataList={codeData.topCodeMc}
    //                 />
    //               </Stack>
    //             </TD>
    //           </TableRow>
    //
    //           <TableRow>
    //             <TH sx={{ width: "252px" }}>분석 종류</TH>
    //             <TD>
    //               <Stack direction="row">
    //                 <LazyRadioboxList
    //                   inputName="midCodeMc"
    //                   dataList={codeData.midCodeMc}
    //                 />
    //               </Stack>
    //             </TD>
    //           </TableRow>
    //
    //           <TableRow>
    //             <TH sx={{ width: "252px" }}>분석 방법</TH>
    //             <TD>
    //               <Stack direction="column">
    //                 <LazyCheckboxList
    //                   inputName="btmCodeMcList"
    //                   dataList={codeData.btmValueList}
    //                 />
    //               </Stack>
    //             </TD>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <Stack direction="row" spacing={0.5} justifyContent="center">
    //       <OutlinedButton
    //         buttonName="목록"
    //         onClick={() => router.push("/svc-cate-list")}
    //       />
    //       <ContainedButton buttonName="저장" type="submit" />
    //     </Stack>
    //   </Form>
    // </Container>
  );
}
