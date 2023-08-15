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


interface ModalContainerProps {
    onClose: () => void;
    open: boolean;
    modalWidth: number;
    // data: object;
}

const ExcelUploadModal = ({ onClose,
                            open,
                            modalWidth,
}: // data,
    ModalContainerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const params = useParams();
    // const orderUkey = params.slug;
    // const { data } = useSWR(
    //     `${process.env.NEXT_PUBLIC_API_URL}/order/analysis/${orderUkey}`,
    //     fetcher,
    //     {
    //         suspense: true,
    //     }
    // );
    // const { mutate } = useSWRConfig();

    const handleClose = () => {
        onClose();
        setIsLoading(false);
    };

    const defaultValues = {
        // check16sAt: new Date(data.data.check16sAt),
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        console.log("오더 정보 변경 Body Data ==>>", data);
        console.log("check16At", data.check16sAt);
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
                        <ContainedButton
                            buttonName="엑셀 양식 다운로드"
                            startIcon={<MyIcon icon="download" size={16}/>}
                            color={"secondary"}
                            size="small"
                            sx={{marginLeft: '20spx !important'}}
                        />
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
                        <TextField
                            id="outlined-required"
                            sx={{width: '390px'}}
                            type="file"
                        />
                        <OutlinedButton
                            buttonName="파일 업로드"
                        />
                        <OutlinedButton
                            buttonName="식제"
                            color={"error"}
                        />
                    </Stack>
                </Form>
            </DialogContent>
            <ModalAction>
                <OutlinedButton
                    buttonName="취소"
                    onClick={handleClose}
                    color="secondary"
                />
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    type="submit"
                    form="orderInfoModifyForm"
                >
                    확인
                </LoadingButton>
            </ModalAction>
        </ModalContainer>
    );
};

export default ExcelUploadModal;
