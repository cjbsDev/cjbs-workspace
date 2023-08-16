"use client";

import {
    Box,
    Stack,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Typography,
    TextField,
    Fab,
    Button,
} from "@mui/material";
import {
    CheckboxSV, ContainedButton, ErrorContainer, Fallback,
    Form,
    InputValidation,
    OutlinedButton,
    PostCodeBtn, SelectBox,
    TD,
    TH,
    Title1,
    UnStyledButton,
} from "cjbsDSTM";
import React, { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import dynamic from "next/dynamic";
import LoadingSvg from "public/svg/loading_wh.svg";
import MyIcon from "icon/myIcon";
import {cjbsTheme} from "cjbsDSTM";
import ExcelUploadModal from "@app/(page)/order/ExcelUploadModal";



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

const LazyPrepSelectbox = dynamic(() => import("@components/CommonSelectbox"), {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
});


export default function Page(props: any) {

    console.log("$$$$$$$$$$", props.serviceType);
    let serviceType = props.serviceType;

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

    const [uploadFile, setUploadFile] = React.useState(null);

    const handleFileUpload = (event:any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadFile(file.name);
        };
         reader.readAsDataURL(file);
    };

    // [오더 정보 변경] 모달
    const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =  useState<boolean>(false);
    const orderInfoModifyModalClose = () => {
        setShowOrderInfoModifyModal(false);
    };

    const CommonServiceSelect = () => {
        switch (serviceType){
            case 'fs' :
                return (
                    <TableRow>
                        <TH sx={{ width: "20%" }}>자체 QC 결과 파일 (선택)</TH>
                        <TD sx={{ width: "80%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="upload-image">
                                        <Button
                                            variant="outlined"
                                            color={"secondary"}
                                            component="span"
                                            sx={{color: "#000"}}
                                            size="small"
                                        >
                                            파일 추가
                                        </Button>
                                        <input
                                            id="upload-image"
                                            hidden
                                            accept="image/!*"
                                            type="file"
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                    {uploadFile && <Typography variant="body2">{uploadFile}</Typography>}
                                </Stack>
                            </Stack>
                        </TD>
                    </TableRow>
                )
            case 'ao' :
                return (
                    <TableRow>
                        <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보</TH>
                        <TD sx={{ width: "80%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <ErrorContainer FallbackComponent={Fallback}>
                                    <LazyPrepSelectbox url={"/code/orsh/pltf/list?type=mtpAO"} inputName={"pltfMc"} />
                                </ErrorContainer>
                            </Stack>
                        </TD>
                    </TableRow>
                )
            case 'so' :
                return (
                    <TableRow>
                        <TH sx={{ width: "20%" }}>자체 QC 결과 파일 (선택)</TH>
                        <TD sx={{ width: "80%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <ErrorContainer FallbackComponent={Fallback}>
                                    <LazyPrepSelectbox url={"/code/orsh/pltf/list?type=mtpSO"} inputName={"pltfMc"} />
                                </ErrorContainer>
                            </Stack>
                        </TD>
                    </TableRow>
                )
        }
    }


    return (
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
            <Box
                alignItems="start"
                sx={{
                    backgroundColor: cjbsTheme.palette.grey["50"],
                    paddingX: 5,
                    paddingY: 3,
                    mb: 2
                }}
            >
                <ul>
                    <li style={{color: "#EF151E"}}>
                        <Typography variant="body2">보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.</Typography>
                    </li>
                    <li style={{color: "#EF151E"}}>
                        <Typography variant="body2">분석 결과는 EzBioCloud로 업로드됩니다.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">DNA는 요청 시에만 반송되며, 샘플(분변, 토양 및 기타 환경샘플)은 1개월 후 자동폐기됩니다.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">분석 결과는 연구용으로만 사용이 가능합니다.</Typography>
                    </li>
                </ul>
            </Box>

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">공통 항목 선택</Typography>
            </Stack>
            <TableContainer sx={{ mb: 5 }}>
                <Table>
                    <TableBody>
                        <CommonServiceSelect />
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle1">샘플 리스트</Typography>
                    <UnStyledButton
                        sx={{}}
                        buttonName='엑셀 등록'
                        startIcon={<MyIcon icon="xls3" size={18} />}
                        size="small"
                        onClick={() => setShowOrderInfoModifyModal(true)}
                    />
                </Stack>
                <ExcelUploadModal onClose={orderInfoModifyModalClose} open={showOrderInfoModifyModal} modalWidth={600}/>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <TextField
                        id="outlined-required"
                        defaultValue="0"
                        inputProps={{ maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{width: '55px'}}
                        size="small"
                    />
                    <ContainedButton
                        sx={{}}
                        buttonName='행 추가'
                        size="small"
                        color={"secondary"}
                    />
                </Stack>
            </Stack>
            <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: cjbsTheme.palette.grey[100]}}>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="subtitle2">No.</Typography>
                            </TableCell>
                            <TableCell align="left" sx={{paddingX:2, paddingY:1}}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle2">샘플명 </Typography> <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box>
                                </Stack>
                            </TableCell>
                            <TableCell align="left" sx={{paddingX:2, paddingY:1}}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle2">샘플출처 </Typography> <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box>
                                </Stack>
                            </TableCell>
                            <TableCell align="left" sx={{paddingX:2, paddingY:1}}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle2">샘플 상태 </Typography> <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box>
                                </Stack>
                            </TableCell>
                            <TableCell align="left" sx={{paddingX:2, paddingY:1}}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle2">분석 타겟 유전자 </Typography> <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="subtitle2">자체 DNA QC</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="subtitle2">비고</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>예시</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>CJ01</Typography>
                                <Typography variant="caption" sx={{color: "#666"}}>(영문, 숫자, -(hyphen)만 입력 가능)</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>토양</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>gDNA</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>Bacteria (16S rRNA V3-V4)</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>농도, 사이즈</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2" sx={{color: "#666"}}>gDNA</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <Typography variant="body2">1</Typography>
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <InputValidation
                                    inputName="sampleName1"
                                    required={true}
                                    errorMessage=""
                                    sx={{ width: 176 }}
                                />
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <InputValidation
                                    inputName="sampleName1"
                                    required={true}
                                    errorMessage=""
                                    sx={{ width: 116 }}
                                />
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <SelectBox
                                    required={true}
                                    errorMessage="값을 선택해 주세요."
                                    inputName="gender"
                                    options={[
                                        { value: "Sample", optionName: "Sample" },
                                        { value: "gDNA", optionName: "gDNA" },
                                        { value: "Amplicon", optionName: "Amplicon" },
                                    ]}
                                    sx={{width: '200px'}}
                                />
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <SelectBox
                                    required={true}
                                    errorMessage="값을 선택해 주세요."
                                    inputName="gender"
                                    options={[
                                        { value: "Sample", optionName: "Sample" },
                                        { value: "gDNA", optionName: "gDNA" },
                                        { value: "Amplicon", optionName: "Amplicon" },
                                    ]}
                                    sx={{width: '200px'}}
                                />
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <InputValidation
                                    inputName="sampleName1"
                                    required={true}
                                    errorMessage=""
                                    sx={{ width: 117 }}
                                />
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <InputValidation
                                    inputName="sampleName1"
                                    required={true}
                                    errorMessage=""
                                    sx={{ width: 117 }}
                                />
                            </TableCell>
                            <TableCell sx={{paddingX:2, paddingY:1}}>
                                <MyIcon icon="trash" size={20}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">추가 요청 사항</Typography>
            </Stack>
            {/*<InputValidation*/}
            {/*    inputName="custNm"*/}
            {/*    required={true}*/}
            {/*    errorMessage="이름을 입력해 주세요."*/}
            {/*    sx={{ width: '100%' }}*/}
            {/*    InputProps={{*/}
            {/*        // readOnly: true,*/}
            {/*    }}*/}
            {/*    label={"multiline"}*/}
            {/*    maxRows={4}*/}
            {/*/>*/}
            <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                sx={{ width: '100%', mb:4 }}
                placeholder={"추가 요청 사항을 입력해주세요."}
            />

            <Stack direction="row" spacing={0.5} justifyContent="center">
                {/*<OutlinedButton*/}
                {/*    buttonName="이전"*/}
                {/*    onClick={() => router.push("/order/order-list")}*/}
                {/*/>*/}

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
