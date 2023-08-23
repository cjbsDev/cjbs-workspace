import React, { useState, useMemo } from "react";
import {
    DataCountResultInfo,
    DataTableBase,
    DataTableFilter,
    ExcelDownloadButton,
    ModalContainer,
    ModalTitle,
    ModalAction,
    OutlinedButton,
    TH,
    TD,
    Form,
    InputValidation,
    Fallback,
    ContainedButton, cjbsTheme,
} from "cjbsDSTM";
import {
    Box,
    BoxProps,
    Chip,
    DialogContent,
    Grid,
    Stack,
    styled, TextField,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import dynamic from "next/dynamic";
import LoadingSvg from "@public/svg/loading_wh.svg";
import MyIcon from "icon/myIcon";
import Link from "next/link";
import { useForm } from "react-hook-form";


interface ModalContainerProps {
    onClose: () => void;
    open: boolean;
    modalWidth: number;
    addExcelDataTableRows:object;
}

const ExcelUploadModal = ({ onClose,
                            open,
                            modalWidth,
                            addExcelDataTableRows,
}: // data,
    ModalContainerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
        setIsLoading(false);
    };

    const defaultValues = {
        // check16sAt: new Date(data.data.check16sAt),
    };

    const onSubmit = async () => {
        setIsLoading(true);
        // console.log("엑셀 업로드 데이터 Body Data ==>>", data);
        // console.log("check16At", data.check16sAt);

        const inputFile = document.getElementById("fileInput") as HTMLInputElement;
        console.log("inputFile", inputFile);

        if(!inputFile?.files?.item(0)){
            //
        } else {
            // file 데이터가 있을경우

            const formData = new FormData();
            formData.append("file", inputFile?.files?.item(0) as File);

            const res = await axios.post<{ url: string }>(
                `${process.env.NEXT_PUBLIC_API_URL_ORSH}/sample/excel/mtp/fs`,
                formData,
                {
                    withCredentials: false,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                },
            );
            console.log("res", res);
            addExcelDataTableRows(res.data.data);
            handleClose();

        }
        setIsLoading(false);
    };

    return (
        <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
            <ModalTitle onClose={handleClose}>엑셀 등록</ModalTitle>
            <DialogContent>
                <Form
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    id="excelUploadForm"
                >
                    <Stack
                        alignItems="start"
                        spacing={2}
                        sx={{
                            p: "20px",
                            backgroundColor: cjbsTheme.palette.grey[50],
                        }}
                    >
                        <Typography variant="body2">• 엑셀 양식을 다운로드한 후 데이터를 입력한 파일을 업로드해주세요.</Typography>
                        <Link href="https://bsa-public-resource.s3.ap-northeast-2.amazonaws.com/MTP_Full_service_template.xlsx" target="_blank">
                            <ContainedButton
                                buttonName="엑셀 양식 다운로드"
                                startIcon={<MyIcon icon="download" size={16}/>}
                                color={"secondary"}
                                size="small"
                                sx={{marginLeft: '20spx !important'}}
                            />
                        </Link>
                        {/*https://bsa-public-resource.s3.ap-northeast-2.amazonaws.com/MTP_Analysis_only_template.xlsx*/}
                        {/*https://bsa-public-resource.s3.ap-northeast-2.amazonaws.com/MTP_Sequencing_only_template.xlsx*/}
                        <Typography variant="body2">• 엑셀 등록 시 기존에 입력한 정보는 초기화됩니다.</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                        sx={{
                            mt: "20px",
                        }}
                    >
                        {/*<TextField*/}
                        {/*    id="outlined-required"*/}
                        {/*    sx={{width: '560px'}}*/}
                        {/*    type="file"*/}
                        {/*/>*/}
                        <input id="fileInput" type="file" style={{width:"600px"}}/>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            type="submit"
                            form="excelUploadForm"
                        >
                            파일 업로드
                        </LoadingButton>
                        {/*<OutlinedButton*/}
                        {/*    buttonName="식제"*/}
                        {/*    color={"error"}*/}
                        {/*/>*/}
                    </Stack>
                </Form>
            </DialogContent>
            {/*<ModalAction>*/}
            {/*    <OutlinedButton*/}
            {/*        buttonName="취소"*/}
            {/*        onClick={handleClose}*/}
            {/*        color="secondary"*/}
            {/*    />*/}
            {/*    <LoadingButton*/}
            {/*        variant="contained"*/}
            {/*    >*/}
            {/*        확인*/}
            {/*    </LoadingButton>*/}
            {/*</ModalAction>*/}
        </ModalContainer>
    );
};

export default ExcelUploadModal;
