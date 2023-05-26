import * as React from 'react';
import {Button, ButtonProps} from '@mui/material';
// import { useRouter } from 'next/navigation';

interface CustomButtonProps extends ButtonProps{
  buttonName: string
}

interface LinkButtonProps extends CustomButtonProps{
  pathName: string;
}

export const ContainedButton = ({buttonName, ...props}: CustomButtonProps) => {
  return   <Button {...props} variant="contained">{buttonName}</Button>;
};

export const OutlinedButton = ({buttonName, ...props}: CustomButtonProps) => {
  return   <Button {...props} variant="outlined">{buttonName}</Button>;
};

export const LinkButton = ({buttonName, ...props}: CustomButtonProps) => {
  // const router = useRouter();
  return   <Button {...props} variant="text">{buttonName}</Button>;
};
