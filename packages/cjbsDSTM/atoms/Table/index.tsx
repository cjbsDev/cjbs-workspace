import { styled, TableCell, TableCellProps } from "@mui/material";

export const TH = ({ ...props }: TableCellProps) => {
  return <THStyle {...props}>{props.children}</THStyle>;
};

export const TD = ({ ...props }: TableCellProps) => {
  return <TDStyle {...props}>{props.children}</TDStyle>;
};

const THStyle = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  width: 252,
  backgroundColor: theme.palette.grey.A400,
  fontSize: 14,
  border: "1px solid #CED4DA",
}));

const TDStyle = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  fontSize: 14,
  border: "1px solid #CED4DA",
}));
