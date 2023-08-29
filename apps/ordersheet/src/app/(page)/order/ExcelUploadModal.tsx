import React, { useState, useMemo } from "react";
import {
    ModalContainer,
    ModalTitle,
    ModalAction,
    Form,
    InputValidation,
    ContainedButton, cjbsTheme,
} from "cjbsDSTM";
import {
    DialogContent,
    Stack,
    styled,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import MyIcon from "icon/myIcon";
import Link from "next/link";


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

    const defaultValues = {};

    const onSubmit = async (data: any, e: any) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("엑셀 업로드 데이터 Body Data ==>>", data);

        if(data.fileInput[0]){
            const formData = new FormData();
            formData.append("file", data.fileInput[0] as File);

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
        } else {

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
                        {/*<input id="fileInput" type="file" style={{width:"600px"}}/>*/}
                        <InputValidation
                            inputName="fileInput"
                            required={false}
                            type="file"
                            sx={{ width: 600 }}
                        />
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
