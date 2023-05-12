'use client'
import React, {useState, useEffect} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Grid, TextField, Box, Container, Snackbar, Alert, InputAdornment, Button, Typography, Link} from '@mui/material';
import * as Yup from 'yup';
import { signIn, signOut } from 'next-auth/react';
import {yupResolver} from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { getToken } from 'next-auth/jwt'
import { NextPageContext } from 'next';
import { NextRequest } from 'next/server';

interface IFormInput {
  email: string;
  password: number | string;
}

export const _Link = styled(Link)`
  &:link {
    color: #006ECD;
  }
  &:active {
    color: #006ECD;
  }
  &:visited {
    color: #006ECD;
  }
  text-decoration: none;
`

export const _Container = styled(Container)`
  background-image: url('/img/background/backgroundBlue.png'), url('/img/background/backgroundRed.png'), url('/img/background/backgroundYellow.png');
  background-position: top left, top right, bottom left 160px;
  background-size: 160px, 820px, 620px;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`


const LoginPage = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [alertMessage1, setAlertMessage1] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  const signInSchema = Yup.object({
    email: Yup.string()
      .email("유효한 이메일 형식을 입력해 주세요.")
      .required('이메일을 입력해 주세요.'),
    // password: yup.mixed().required(),
    password: Yup.string()
      .required('패스워드를 입력해 주세세요.')
      .min(8, '비밀번호는 최소 8자리 입니다.')
      .max(16, '비밀번호는 최대 16자리 입니다.')
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      //   t('loginCharPattern'),
      // ),
  }).required();


  useEffect(()=> {
  }, [])

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    
    const email = `${data.email}`;
    const password = data.password;

    signIn('credentials', { email, password, redirect: false })
      .then(res => {
        //const isError = res && res.error ? res.error : null
        if(res?.error){ //로그인성공
          const errorMessage = res.error.split("Error:")[1]
          toast(errorMessage, {type:'error'})
        }
        else {
          router.push('/dashboard')
        }
      })

  }
  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };


  return (
    <>
      <_Container maxWidth={false} >

        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          style={{maxWidth: 380}}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography>Kang's System</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({field}) => (
                  <TextField
                    {...field}
                    error={errors.email && true}
                    margin='normal'
                    required
                    fullWidth
                    id="email"
                    label={'이메일'}
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    size='medium'
                  />
                )}
                control={control}
                name='email'
                defaultValue=''
              />
              {errors.email && <Alert severity='error'>{errors.email.message}</Alert>}
            </Grid>

            <Grid item xs={12}>
              <Controller
                render={({field}) => (
                  <TextField
                    {...field}
                    size='medium'
                    error={errors.password && true}
                    margin='normal'
                    required
                    fullWidth
                    label={'패스워드'}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        // Do code here
                        handleSubmit(onSubmit)
                      }
                    }}
                  />
                )}
                control={control}
                name={'password'}
                defaultValue=''
              />
              {errors.password && <Alert severity='error'>{errors.password.message}</Alert>}
            </Grid>
            <Button
              type="submit"
              color="primary"
              size='large'
              variant="contained"
              sx={{mt: 3, mb: 3, textTransform:"none"}}
              fullWidth={true}
            >
                <Typography>로그인</Typography>
            </Button>
            <Grid container sx={{justifyContent:'flex-end'}} >
              {/* <Grid item>
                <Lnk linkName={t('forgetPassword')} href="/user/forgetPassword" />
              </Grid> */}
              <Grid xs={6} item>
              </Grid>
              {/* <Grid xs={6} item sx={{display:'flex', justifyContent:'flex-end'}}>
                <_Link  href="/user/signup">계정 만들기</_Link>
              </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </_Container>
    </>
  );
};


export default LoginPage;


