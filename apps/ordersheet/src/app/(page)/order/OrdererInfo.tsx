"use client";

import {
    Box,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import {
    CheckboxSV, ContainedButton, ErrorContainer, Fallback,
    Form,
    InputValidation,
    OutlinedButton,
    PostCodeBtn,
    TD,
    TH,
    Title1,
} from "cjbsDSTM";
import * as React from "react";
import { useRouter } from "next-nprogress-bar";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import dynamic from "next/dynamic";
import LoadingSvg from "public/svg/loading_wh.svg";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/extr`;

const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
    ssr: false,
});

// const LazySalesManagerSelctbox = dynamic(
//     () => import("../../components/SalesManagerSelectbox"),
//     {
//         ssr: false,
//         loading: () => <Typography variant="body2">Loading...</Typography>,
//     }
// );

export default function Page() {
    const router = useRouter();
    // [고객 검색] 모달
    const [custSearchModalOpen, setCustSearchModalOpen] =
        React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const defaultValues = {
        srvcTypeMc: "BS_0100007004",
        anlsTypeMc: "BS_0100006004",
        pltfMc: "BS_0100008001",
        taxonBCnt: 0,
        taxonECnt: 0,
        taxonACnt: 0,
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        console.log("Submit Data ==>>", data);
        const typeNumberPrice = Number(data.price);
        const typeNumbertaxonACnt = Number(data.taxonACnt);
        const typeNumbertaxonBCnt = Number(data.taxonBCnt);
        const typeNumbertaxonECnt = Number(data.taxonECnt);

        const bodyData = {
            addEmailList: data.addEmailList,
            agncUkey: data.agncUkey,
            anlsTypeMc: data.anlsTypeMc,
            bsnsMngrUkey: data.bsnsMngrUkey,
            custUkey: data.custUkey,
            isCheck16s: data.isCheck16s,
            mailRcpnList: data.mailRcpnList,
            memo: data.memo,
            orderTypeCc: data.orderTypeCc,
            ordrAplcEmail: data.ordrAplcEmail,
            ordrAplcNm: data.ordrAplcNm,
            ordrAplcTel: data.ordrAplcTel,
            pltfMc: data.pltfMc,
            price: typeNumberPrice,
            reqReturnList: data.reqReturnList,
            srvcTypeMc: data.srvcTypeMc,
            taxonACnt: typeNumbertaxonACnt,
            taxonBCnt: typeNumbertaxonBCnt,
            taxonECnt: typeNumbertaxonECnt,
        };

        console.log("Body Data ==>>", bodyData);
    };
    // [ 고객 검색 ] 모달 오픈
    const handleCustSearchModalOpen = () => {
        setCustSearchModalOpen(true);
    };

    return (
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
            <Typography variant="subtitle1" sx={{}}>
                주문자 정보
            </Typography>
            <TableContainer sx={{ mb: 5 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TH sx={{ width: "15%" }}>Ezbiocloud 계정</TH>
                            <TD sx={{ width: "85%" }} colSpan={3}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    {/*<InputValidation*/}
                                    {/*    inputName="ebcEmail"*/}
                                    {/*    required={true}*/}
                                    {/*    errorMessage="아이디(이메일) 입력해 주세요."*/}
                                    {/*    sx={{ width: 600 }}*/}
                                    {/*    InputProps={{*/}
                                    {/*        readOnly: true,*/}
                                    {/*    }}*/}
                                    {/*/>*/}

                                    {/*<InputValidation*/}
                                    {/*    sx={{ display: "none" }}*/}
                                    {/*    inputName="custUkey"*/}
                                    {/*    required={true}*/}
                                    {/*    // errorMessage="키값 입력하세요."*/}
                                    {/*    InputProps={{*/}
                                    {/*        readOnly: true,*/}
                                    {/*        hidden: true,*/}
                                    {/*    }}*/}
                                    {/*/>*/}

                                    {/*<OutlinedButton*/}
                                    {/*    size="small"*/}
                                    {/*    buttonName="아이디 검색"*/}
                                    {/*    onClick={handleCustSearchModalOpen}*/}
                                    {/*/>*/}
                                </Stack>
                            </TD>
                        </TableRow>
                        <TableRow>
                            <TH sx={{ width: "20%" }}>연구책임자 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "30%" }}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                            <TH sx={{ width: "20%" }}>연락처</TH>
                            <TD sx={{ width: "30%" }}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                        </TableRow>
                        <TableRow>
                            <TH sx={{ width: "20%" }}>기관 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "30%" }}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                            <TH sx={{ width: "20%" }}>연구 부서 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "30%" }}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">신청인 정보</Typography>
                <LazyQuickCopy />
            </Stack>
            <TableContainer sx={{ mb: 5 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TH sx={{ width: "20%" }}>신청인 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "30%" }}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                            <TH sx={{ width: "20%" }}>신청인 이메일 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "30%" }}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                        </TableRow>
                        <TableRow>
                            <TH sx={{ width: "20%" }}>연락처 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "80%" }} colSpan={3}>
                                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                    <InputValidation
                                        inputName="custNm"
                                        required={true}
                                        errorMessage="이름을 입력해 주세요."
                                        sx={{ width: 306 }}
                                        InputProps={{
                                            // readOnly: true,
                                        }}
                                    />
                                </Stack>
                            </TD>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="subtitle1" sx={{}}>
                부가 정보
            </Typography>
            <TableContainer sx={{ mb: 5 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TH sx={{ width: "20%" }}>주소  <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "80%" }} colSpan={5}>
                                <Stack spacing={1}>
                                    <Stack direction="row" spacing={0.5}>
                                        <InputValidation
                                            disabled={true}
                                            inputName="zip"
                                            placeholder="우편번호"
                                        />
                                        <PostCodeBtn />
                                        <OutlinedButton
                                            size="small"
                                            buttonName="삭제"
                                            color="error"
                                            // onClick={handleClick}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={0.5}>
                                        <InputValidation
                                            disabled={true}
                                            inputName="addr"
                                            sx={{ width: 600 }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={0.5}>
                                        <InputValidation
                                            inputName="addrDetail"
                                            maxLength={50}
                                            maxLengthErrMsg="50자 이내로 입력해주세요."
                                            placeholder="상세주소"
                                            sx={{ width: 600 }}
                                        />
                                    </Stack>
                                </Stack>
                            </TD>
                        </TableRow>

                        <TableRow>
                            <TH sx={{ width: "20%" }}>진행사항 메일 수신 설정 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                            <TD sx={{ width: "80%" }} colSpan={5}>
                                <Stack direction="row">
                                    <CheckboxSV
                                        inputName="mailRcpnList"
                                        labelText="연구책임자"
                                        value="agncLeaderRcpn"
                                    />
                                    <CheckboxSV
                                        inputName="mailRcpnList"
                                        labelText="신청인"
                                        value="ordrAplcRcpn"
                                    />
                                    <CheckboxSV
                                        inputName="mailRcpnList"
                                        labelText="추가 이메일(직접입력)"
                                        value="etcRcpn"
                                    />
                                    <InputValidation
                                        inputName="addEmailList"
                                        // placeholder="여러개 입력시','로 구분하세요."
                                        placeholder="example@gmail.com, example2@gmail.com"
                                        sx={{ width: 550 }}
                                    />
                                </Stack>
                            </TD>
                        </TableRow>
                        {/*<TableRow>*/}
                        {/*    <TH sx={{ width: "20%" }}>영업담당자 (선택)</TH>*/}
                        {/*    <TD sx={{ width: "80%" }} colSpan={5}>*/}
                        {/*        <ErrorContainer FallbackComponent={Fallback}>*/}
                        {/*            <LazySalesManagerSelctbox />*/}
                        {/*        </ErrorContainer>*/}
                        {/*    </TD>*/}
                        {/*</TableRow>*/}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={0.5} justifyContent="center">
                <OutlinedButton
                    buttonName="이전"
                    // onClick={() => router.push("/order/order-list")}
                />

                <ContainedButton
                    type="submit"
                    buttonName="다음"
                    endIcon={
                        isLoading ? (
                            <LoadingSvg stroke="white" width={20} height={20} />
                        ) : null
                    }
                />
            </Stack>

        </Form>
    );
}