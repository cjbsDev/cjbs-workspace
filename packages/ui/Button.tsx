import {Button, ButtonProps} from '@mui/material';

interface CustomButtonProps extends ButtonProps{
  buttonName: string

}
export const CustomButton = ({buttonName}: CustomButtonProps) => {
  return   <Button variant="contained">{buttonName}</Button>;
};
