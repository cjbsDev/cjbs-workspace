"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import SkeletonLoading from "../../../components/SkeletonLoading";

const LazyEsPrModify = dynamic(() => import("./EsPrModify"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function AgncPIModifyPage() {
  // const searchParams = useSearchParams();
  // const params = searchParams.get("esPrMngUkey");
  // const uKey = params;
  // const router = useRouter();
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // [ 수정 ]
  // const onSubmit = async (data: any) => {
  //   console.log("in onSubmit", data);
  //   //console.log("selectedMembers", selectedMembers);
  //
  //   ///mngr/esPrMng/{esPrMngUkey}
  //   let saveObj = {
  //     inclInfo: data.inclInfo,
  //     isUse: data.isUse,
  //     prNm: data.prNm,
  //   };
  //   console.log("==modify", saveObj);
  //   console.log("modify stringify", JSON.stringify(saveObj));
  //
  //   const apiUrl = `/mngr/esPrMng/${uKey}`; // Replace with your API URL
  //
  //   try {
  //     const response = await PUT(apiUrl, saveObj); // API 요청
  //     if (response.success) {
  //       router.push("/es-pr-list/" + uKey);
  //     } else if (response.code == "INVALID_AUTHORITY") {
  //       toast("권한이 없습니다.");
  //     } else {
  //       toast("문제가 발생했습니다. 01");
  //     }
  //   } catch (error) {
  //     console.error("request failed:", error);
  //     toast("문제가 발생했습니다. 02");
  //   }
  // };

  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyEsPrModify />
    </ErrorContainer>
    // <FormProvider {...methods}>
    //   <Container maxWidth={false} sx={{ width: "100%" }}>
    //     <Box
    //       component="form"
    //       noValidate
    //       autoComplete="off"
    //       onSubmit={handleSubmit(onSubmit)}
    //     >
    //       <Box sx={{ mb: 4 }}>
    //         <Title1 titleName="견적 품명 수정" />
    //       </Box>
    //
    //       <Typography variant="subtitle1" sx={{ mt: 5 }}>
    //         기본 정보
    //       </Typography>
    //       <TableContainer sx={{ mb: 5 }}>
    //         <Table>
    //           <TableBody>
    //             <TableRow>
    //               <TH sx={{ width: "15%" }}>분석종류</TH>
    //               <TD sx={{ width: "85%" }}>{getValues("anlsTypeMcVal")}</TD>
    //             </TableRow>
    //
    //             <TableRow>
    //               <TH sx={{ width: "15%" }}>품명</TH>
    //
    //               <TD sx={{ width: "85%" }}>
    //                 <InputValidation
    //                   inputName="prNm"
    //                   required={true}
    //                   sx={{ width: 600 }}
    //                 />
    //               </TD>
    //             </TableRow>
    //
    //             <TableRow>
    //               <TH sx={{ width: "15%" }}>메모</TH>
    //               <TD sx={{ width: "85%" }} colSpan={5}>
    //                 <InputValidation
    //                   fullWidth={true}
    //                   multiline
    //                   rows={10}
    //                   inputName="inclInfo"
    //                 />
    //               </TD>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </TableContainer>
    //
    //       <Stack direction="row" spacing={0.5} justifyContent="center">
    //         <OutlinedButton
    //           buttonName="목록"
    //           onClick={() => router.push("/es-pr-list/")}
    //         />
    //         <ContainedButton buttonName="수정" type="submit" />
    //       </Stack>
    //     </Box>
    //
    //     <Box sx={{ mb: 5 }}>
    //       <ErrorContainer FallbackComponent={Fallback}>
    //         <LazyCommontModifyLog
    //           apiName="esPrMng"
    //           uKey={uKey}
    //           logTitle=""
    //           type="mngr"
    //         />
    //       </ErrorContainer>
    //     </Box>
    //   </Container>
    // </FormProvider>
  );
}
