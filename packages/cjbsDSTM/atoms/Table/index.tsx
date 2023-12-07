import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { styled, TableCell, TableCellProps } from "@mui/material";

export const TH = ({ ...props }: TableCellProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      {/*<TableCell*/}
      {/*  {...props}*/}
      {/*  component="th"*/}
      {/*  sx={{*/}
      {/*    color: cjbsTheme.palette.common.black,*/}
      {/*    backgroundColor: cjbsTheme.palette.grey["100"],*/}
      {/*    fontSize: 14,*/}
      {/*    fontWeight: 400,*/}
      {/*    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,*/}
      {/*    letterSpacing: "-0.25px",*/}
      {/*    padding: "10px 16px",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {props.children}*/}
      {/*</TableCell>*/}
      <THStyle component="th" {...props}>
        {props.children}
      </THStyle>
    </ThemeProvider>
  );
};

export const TD = ({ ...props }: TableCellProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      {/*<TableCell*/}
      {/*  {...props}*/}
      {/*  sx={{*/}
      {/*    color: cjbsTheme.palette.common.black,*/}
      {/*    backgroundColor: cjbsTheme.palette.common.white,*/}
      {/*    fontSize: 14,*/}
      {/*    fontWeight: 400,*/}
      {/*    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,*/}
      {/*    letterSpacing: "-0.25px",*/}
      {/*    whiteSpace: "pre",*/}
      {/*    padding: "10px 16px",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {props.children}*/}
      {/*</TableCell>*/}
      <TDStyle {...props}>{props.children}</TDStyle>
    </ThemeProvider>
  );
};

const THStyle = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.grey["100"],
  fontSize: 14,
  fontWeight: 400,
  border: `1px solid ${theme.palette.grey["400"]}`,
  letterSpacing: "-0.25px",
  padding: "10px 16px",
  // verticalAlign: "top",
}));

const TDStyle = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  fontSize: 14,
  fontWeight: 400,
  border: `1px solid ${theme.palette.grey["400"]}`,
  letterSpacing: "-0.25px",
  whiteSpace: "pre",
  padding: "10px 16px",
}));
