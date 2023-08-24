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
    Button,
} from "@mui/material";
import {
    ContainedButton,
    ErrorContainer,
    Fallback,
    Form,
    InputValidation,
    TD,
    TH,
    UnStyledButton,
} from "cjbsDSTM";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import LoadingSvg from "public/svg/loading_wh.svg";
import MyIcon from "icon/myIcon";
import {cjbsTheme} from "cjbsDSTM";
import ExcelUploadModal from "@app/(page)/order/ExcelUploadModal";
import TableRows from "./TableRows"
import MtpFullService from "@app/(page)/order/mtp/MtpFullService";
import {useForm} from "react-hook-form";


const LazyPrepSelectbox = dynamic(() => import("../../components/CommonSelectbox"), {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
});

type FormValues = {
    samples: {
        sampleNm: string;
        source: string;
        sampleCategoryCc: string;
        anlsTargetGene: string;
        qc: string;
        memo: string;
    }[];
};

export default function Page(props: any) {

    // console.log("$$$$$$$$$$", props.serviceType);
    let serviceType = props.serviceType;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const defaultValues = {};
    // const {
    //     register,
    //     control,
    //     handleSubmit,
    //     formState: { errors }
    // } = useForm<FormValues>({
    //     defaultValues: {
    //         samples: [{
    //             sampleNm: "",
    //             source: "",
    //             sampleCategoryCc: "",
    //             anlsTargetGene: "",
    //             qc: "",
    //             memo: "",
    //         }]
    //     },
    //     mode: "onBlur"
    // });

    // 행 추가 될 값 저장
    const onChange = (e: any) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    }

    const onSubmit = async (data: any) => {
        // setIsLoading(true);
        console.log("Submit Data ==>>", data);
        // console.log("length", Object.keys(data).length);
        const samples = [];
        const sampleCnt = (Object.keys(data).length-1) / 6;
        for (let i = 0; i < sampleCnt; i++) {
            const sample = {
                anlsTargetGene: data[i+"_anlsTargetGene"],
                memo: data[i+"_memo"],
                qc: data[i+"_qc"],
                sampleCategoryCc: data[i+"_sampleCategoryCc"],
                sampleNm: data[i+"_sampleNm"],
                source: data[i+"_source"],
            }
            samples.push(sample);
        }
        console.log(samples)

        // console.log("Body Data ==>>", bodyData);
    };


    const [uploadFile, setUploadFile] = useState(null);
    const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =  useState<boolean>(false);

    // file upload
    const handleFileUpload = (event:any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadFile(file.name);
        };
         reader.readAsDataURL(file);
    };

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
            // case 'so' :
            //     return (
            //         <TableRow>
            //             <TH sx={{ width: "20%" }}>자체 QC 결과 파일 (선택)</TH>
            //             <TD sx={{ width: "80%" }}>
            //                 <Stack direction="row" spacing={0.5} alignItems="flex-start">
            //                     <ErrorContainer FallbackComponent={Fallback}>
            //                         <LazyPrepSelectbox url={"/code/orsh/pltf/list?type=mtpSO"} inputName={"pltfMc"} />
            //                     </ErrorContainer>
            //                 </Stack>
            //             </TD>
            //         </TableRow>
            //     )
        }
    }

    const [rowsData, setRowsData] = useState<any>([]);

    const [inputs, setInputs] = useState<any>({
        addRowCnt: 1
    });
    const { addRowCnt } = inputs;

    const rowsInput= {
        sampleNo: 0,
        sampleNm: "",
        source: "",
        sampleCategoryCc: "",
        anlsTargetGene: "",
        qc: "",
        memo: "",
    }

    const addTableRows = () => {
        const newArray = Array.from({ length: addRowCnt }, (_, index) => rowsInput);
        console.log(newArray);
        setRowsData([...rowsData, ...newArray]);
    }

    const deleteTableRows = (index:number) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const addExcelDataTableRows = (newArray:any) => {
        // const rows = [...rowsData];
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(newArray)
        setRowsData([...rowsData, ...newArray]);
    }

    // const handleChange = (index, evnt)=>{
    //     const { name, value } = evnt.target;
    //     console.log("!!!!!!name : " +name)
    //     console.log("!!!!!!value : " +value)
    //     const rowsInput = [...rowsData];
    //     rowsInput[index][name] = value;
    //     setRowsData(rowsInput);
    // }


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
                {serviceType !== 'so' ? (
                    <Typography variant="subtitle1">공통 항목 선택</Typography>
                ) : ('')}
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
                <ExcelUploadModal onClose={orderInfoModifyModalClose} open={showOrderInfoModifyModal} modalWidth={800} addExcelDataTableRows={addExcelDataTableRows}/>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <TextField
                        id="outlined-required"
                        defaultValue="1"
                        inputProps={{ maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{width: '55px'}}
                        size="small"
                        name="addRowCnt"
                        onChange={onChange}
                    />
                    <ContainedButton
                        buttonName='행 추가'
                        size="small"
                        color={"secondary"}
                        onClick={addTableRows}
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
                                <Typography variant="body2" sx={{color: "#666", width:"30px"}}>예시</Typography>
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

                        <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows}/>
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">추가 요청 사항</Typography>
            </Stack>

            <InputValidation
                inputName="test"
                required={true}
                errorMessage="추가 요청 사항을 입력해주세요."
                multiline
                maxRows={4}
                sx={{ width: '100%', mb:4 }}
                placeholder={"추가 요청 사항을 입력해주세요."}
            />

            <Stack direction="row" spacing={0.5} justifyContent="center">
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
