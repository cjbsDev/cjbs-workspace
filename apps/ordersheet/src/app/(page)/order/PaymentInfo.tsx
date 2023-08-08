"use client";

import {
    Box,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Typography,
    ToggleButton,
    ToggleButtonGroup
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
import MyIcon from "icon/myIcon";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/extr`;

const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
    ssr: false,
});

const LazySalesManagerSelctbox = dynamic(
    () => import("../../components/SalesManagerSelectbox"),
    {
        ssr: false,
        loading: () => <Typography variant="body2">Loading...</Typography>,
    }
);

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




    const [alignment, setAlignment] = React.useState('account');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">세금계산서 정보</Typography>
                <Typography variant="body2" sx={{ml:2}}>
                    접수된 주문의 분석 완료 시 기입해주신 결제 정보에 따라 계산서 발행이 진행됩니다.
                </Typography>
            </Stack>
            <TableContainer sx={{ mb: 5 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TH sx={{ width: "20%" }}>사업자 등록번호 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
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
                            <TH sx={{ width: "20%" }}>상호 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
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
                            <TH sx={{ width: "20%" }}>대표자명 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
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
                            <TH sx={{ width: "20%" }}>수취 E-mail <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
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
                <Typography variant="subtitle1">결제 방식 선택</Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ mb: 5, width:'100%' }}
            >
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ width: '100%', justifyContent: 'space-between' }}
                >
                    <ToggleButton value="account" sx={{width:'50%'}}>
                        계좌이체
                        <MyIcon icon="person" size={24} />
                    </ToggleButton>
                    <ToggleButton value="card" sx={{width:'50%'}}>
                        카드결제
                        <MyIcon icon="person" size={24} />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <CheckboxSV
                    inputName="mailRcpnList"
                    labelText="개인정보 수집 및 활용에 동의합니다.(필수)"
                    value="agncLeaderRcpn"
                />
            </Stack>

            <Stack direction="row" spacing={0.5} justifyContent="center">
                <OutlinedButton
                    buttonName="이전"
                    // onClick={() => router.push("/order/order-list")}
                />

                <ContainedButton
                    type="submit"
                    buttonName="주문 요청"
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
