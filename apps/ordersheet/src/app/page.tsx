"use client";

import * as React from "react";
import { useRouter } from "next-nprogress-bar";
import MyIcon from "icon/myIcon";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Box,
    DialogContent,
    Divider,
    InputAdornment,
    Stack,
    Typography,
    Container,
    Link,
    Grid,
    Checkbox,
    CssBaseline,
    TextField,
    FormControlLabel
} from "@mui/material";
import {
    AlertModal,
    // Checkbox,
    ContainedButton,
    LinkButton,
    Form,
    Radio,
    SelectBox,
    OutlinedButton,
    InputValidation,
    ResetButton,
    XlargeButton,
} from "cjbsDSTM";
import { signIn } from 'next-auth/react';

const theme = createTheme();
export default function Page() {
    const router = useRouter();

    const onSubmit = (data:any) => {
        console.log(data);
        let email = data.email;
        let password = data.password
        signIn('credentials', { email, password, callbackUrl: '/main' }).then((res) => {
            //const isError = res && res.error ? res.error : null
            console.log("!!!!res=", res)
            console.log("QWEQWEQWEQWEQWEQWEQWEQWEQWEQWE")
            if (res?.error) {
                const errorMessage = res.error.split('Error:')[1];
                // toast(errorMessage, { type: 'info' });
            } else {
                //로그인성공
                //router.push('/main');
            }
        });
    };

    return (
        <Box sx={{
            backgroundImage: `url('./img/background/backgroundBlue.png'), url('./img/background/backgroundRed.png'), url('./img/background/backgroundYellow.png')`,
            backgroundPosition: 'top left, top right, bottom left 160px',
            backgroundSize: '160px, 820px, 620px',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
        }}>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        // marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{marginTop: 25, marginBottom:5, width: 210}}>
                        <MyIcon icon="cj_bk"/>
                    </Box>
                    <Typography variant="title1" sx={{marginBottom: 2}}>
                        NGS Service
                    </Typography>
                    <Typography variant="body2" sx={{marginBottom: 2}}>
                        NGS 서비스 주문 시스템을 이용하시려면<br/>EzBioCloud 계정이 필요합니다.
                    </Typography>
                    <Form onSubmit={onSubmit} defaultValues={undefined} >

                        <InputValidation
                            margin="normal"
                            inputName="email"
                            // label="이메일"
                            placeholder="이메일"
                            required={true}
                            errorMessage="이메일 형식의 아이디를 입력해 주세요."
                            pattern={/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
                            patternErrMsg="이메일 형식이 아닙니다."
                            sx={{ width: 380 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MyIcon icon="profile" size={20}/>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <InputValidation
                            inputName="password"
                            // label="비밀번호"
                            placeholder="label"
                            required={true}
                            errorMessage="비밀번호를 입력해 주세요."
                            type="password"
                            // sx={{ width: 100 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MyIcon icon="lock" size={20}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        {/*<LinkButton*/}
                        {/*    fullWidth*/}
                        {/*    buttonName="Sign In"*/}
                        {/*    onClick={() => router.push("main")}*/}
                        {/*/>*/}
                        <ContainedButton
                            buttonName="로그인"
                            type="submit"
                            fullWidth
                            style={{marginTop:10, marginBottom:10 }}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Typography variant="button">
                                    아직 회원이 아니신가요?
                                </Typography>
                                <Link href="https://www.ezbiocloud.net/signup?from=mydata" variant="body2" underline="none" target="_blank">
                                    회원가입
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" underline="none">
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Box>

            </Container>
        </Box>
    );
}