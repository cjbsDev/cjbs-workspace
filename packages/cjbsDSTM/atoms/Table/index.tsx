import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { styled, TableCell, TableCellProps } from "@mui/material";

export const TH = ({ ...props }: TableCellProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <THStyle component="th" {...props}>
        {props.children}
      </THStyle>
    </ThemeProvider>
  );
};

export const TH2 = ({ ...props }: TableCellProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TH2Style component="th" {...props}>
        {props.children}
      </TH2Style>
    </ThemeProvider>
  );
};

export const TD = ({ ...props }: TableCellProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TDStyle {...props}>{props.children}</TDStyle>
    </ThemeProvider>
  );
};
export const TD2 = ({ ...props }: TableCellProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TD2Style {...props}>{props.children}</TD2Style>
    </ThemeProvider>
  );
};

const THStyle = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.grey["200"],
  fontSize: 14,
  fontWeight: 400,
  border: `1px solid ${theme.palette.grey["400"]}`,
  letterSpacing: "-0.25px",
  padding: "2px 16px",
  height: "36px",
}));

const TH2Style = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: "black",
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: "-0.25px",
  padding: "2px 16px",
  height: "36px",
}));

const TDStyle = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  fontSize: 14,
  fontWeight: 400,
  border: `1px solid ${theme.palette.grey["400"]}`,
  letterSpacing: "-0.25px",
  whiteSpace: "pre",
  padding: "2px 6px",
  height: "36px",
}));

const TD2Style = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: "-0.25px",
  whiteSpace: "pre",
  padding: "2px 6px",
  height: "36px",
}));
