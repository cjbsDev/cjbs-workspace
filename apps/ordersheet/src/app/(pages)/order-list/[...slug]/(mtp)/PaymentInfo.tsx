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
    ToggleButtonGroup,
    styled, Link
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
import LoadingSvg from "@public/svg/loading_wh.svg";
import MyIcon from "icon/myIcon";
import {useParams} from "next/navigation";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0),
        border: '1px solid #CED4DA',
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
            border: '1px solid #CED4DA',
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
            border: '1px solid #CED4DA',
        },
    },
}));

export default function Page(props:JSON) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [alignment, setAlignment] = React.useState('account');

    const params = useParams();
    console.log("params", params.slug[2]);
    const updataYn = params.slug[2];

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if(newAlignment === null) return;
        setAlignment(newAlignment);
    };

    const onSubmit = async (data: any) => {
        console.log("**************************************");
        // setIsLoading(true);
        console.log("Submit Data ==>>", data);
        console.log("alignment ==>>", alignment);
        const inputPaymentData = {
            brno: data.brno,
            conm: data.conm,
            pymtWayCc: alignment === "account" ? "BS_1300001" : "BS_1300002",
            rcpnNm: data.rcpnNm,
            rcpnEmail: data.rcpnEmail,
            rprsNm: data.rprsNm,
        };
        const returnData = {
            payment: inputPaymentData,
        };
        // props.addBodyData(returnData);
    };

    return (
      <>
        {/*<Form onSubmit={onSubmit} defaultValues={defaultValues}>*/}

        <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="subtitle1">세금계산서 정보</Typography>
            <Typography variant="body2" sx={{pl:1}}>
                접수된 주문의 분석 완료 시 기입해주신 결제 정보에 따라 계산서 발행이 진행됩니다.
            </Typography>
        </Stack>
        <TableContainer sx={{ mb: 5 }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TH sx={{ width: "20%" }}>상호 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                        <TD sx={{ width: "80%" }} colSpan={3}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <InputValidation
                                    inputName="conm"
                                    required={true}
                                    errorMessage="이름을 입력해 주세요."
                                    placeholder="상호를 입력해 주세요."
                                    sx={{
                                      width: 800,
                                      ".MuiOutlinedInput-input:read-only": {
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                      },
                                    }}
                                    InputProps={{
                                      readOnly: updataYn === 'Y' ? false : true
                                    }}
                                />
                            </Stack>
                        </TD>
                    </TableRow>
                    <TableRow>
                        <TH sx={{ width: "20%" }}>사업자 등록번호 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                        <TD sx={{ width: "30%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <InputValidation
                                    inputName="brno"
                                    required={true}
                                    errorMessage="사업자 등록번호를 입력해 주세요."
                                    pattern={/^[0-9]+$/}
                                    patternErrMsg="숫자만 입력해주세요."
                                    minLength={10}
                                    minLengthErrMsg="사업자등록 번호는 10자리를 입력해주세요."
                                    maxLength={10}
                                    maxLengthErrMsg="사업자등록 번호는 10자리를 입력해주세요."
                                    placeholder="- 없이 숫자만 입력해 주세요."
                                    sx={{
                                      width: 306,
                                      ".MuiOutlinedInput-input:read-only": {
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                      },
                                    }}
                                    InputProps={{
                                      readOnly: updataYn === 'Y' ? false : true
                                    }}
                                />
                            </Stack>
                        </TD>
                        <TH sx={{ width: "20%" }}>대표자명 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                        <TD sx={{ width: "30%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <InputValidation
                                    inputName="rprsNm"
                                    required={true}
                                    errorMessage="이름을 입력해 주세요."
                                    placeholder="상호를 입력해 주세요."
                                    sx={{
                                      width: 306,
                                      ".MuiOutlinedInput-input:read-only": {
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                      },
                                    }}
                                    InputProps={{
                                      readOnly: updataYn === 'Y' ? false : true
                                    }}
                                />
                            </Stack>
                        </TD>
                    </TableRow>
                    <TableRow>
                        <TH sx={{ width: "20%" }}>수취자명 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                        <TD sx={{ width: "30%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <InputValidation
                                    inputName="rcpnNm"
                                    required={true}
                                    errorMessage="수취자명을 입력해 주세요."
                                    placeholder="수취자명을 입력해 주세요."
                                    sx={{
                                      width: 306,
                                      ".MuiOutlinedInput-input:read-only": {
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                      },
                                    }}
                                    InputProps={{
                                      readOnly: updataYn === 'Y' ? false : true
                                    }}
                                />
                            </Stack>
                        </TD>
                        <TH sx={{ width: "20%" }}>수취 E-mail <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
                        <TD sx={{ width: "30%" }}>
                            <Stack direction="row" spacing={0.5} alignItems="flex-start">
                                <InputValidation
                                    inputName="rcpnEmail"
                                    required={true}
                                    errorMessage="수취 이메일을 입력해 주세요."
                                    pattern={/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
                                    patternErrMsg="이메일 형식이 아닙니다."
                                    placeholder="수취 이메일을 입력해 주세요."
                                    sx={{
                                      width: 306,
                                      ".MuiOutlinedInput-input:read-only": {
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                      },
                                    }}
                                    InputProps={{
                                      readOnly: updataYn === 'Y' ? false : true
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
            sx={{ mb: 3, width:'100%' }}
        >
            <StyledToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{ width: '100%', justifyContent: 'space-between' }}
            >
                <ToggleButton value="account" sx={{width:'49%'}}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width:'100%' }}
                    >
                        <Typography variant="body2">계좌이체</Typography>
                        <MyIcon icon="transfer" size={24} />
                    </Stack>
                </ToggleButton>
                <ToggleButton value="card" sx={{width:'49%'}}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width:'100%' }}
                    >
                        <Typography variant="body2">카드결제</Typography>
                        <MyIcon icon="card" size={24} />
                    </Stack>
                </ToggleButton>
            </StyledToggleButtonGroup>
        </Stack>

        {/*<Stack direction="row" alignItems="center" spacing={0.5}>*/}
        {/*    <CheckboxSV*/}
        {/*        inputName="isAgree"*/}
        {/*        labelText="개인정보 수집 및 활용에 동의합니다 (필수)"*/}
        {/*        value="Y"*/}
        {/*        required={true}*/}
        {/*        errorMessage="개인정보 수집 및 활용에 동의해 주세요."*/}
        {/*    />*/}
        {/*</Stack>*/}

        <Stack direction="row" spacing={0.5} justifyContent="center" sx={{pt:3}}>
            <OutlinedButton
                buttonName="목록"
                onClick={() => router.push("/order-list")}
            />

          {updataYn === 'y' ? (
            <ContainedButton
              type="submit"
              buttonName="주문 수정"
              endIcon={
                isLoading ? (
                  <LoadingSvg stroke="white" width={20} height={20} />
                ) : null
              }
            />
          ) : (
            ''
          )}
        </Stack>

        {/*</Form>*/}
      </>


    );
}
