import { TH, TD, cjbsTheme } from "cjbsDSTM";
import useSWR from "swr";
import {
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import fetcher from "../../../../../func/fetcher";

interface CustInfoProps {
  slug: string;
}

const CustInfo: React.FC<CustInfoProps> = ({ slug }) => {
  const { data: custTemp } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`,
    fetcher,
    { suspense: true }
  );

  const custData = custTemp.data;

  return (
    <>
      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={2}>
                {custData.custNm ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연락처</TH>
              <TD sx={{ width: "85%" }} colSpan={2}>
                {custData.telList ? custData.telList.join(", ") : "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {custData.agncNm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">메모</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TD sx={{ minHeight: 130 }}>{custData.memo ?? "-"}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">사용 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD
                sx={{
                  width: "35%",
                  color:
                    custData.isAcs === "Y"
                      ? cjbsTheme.palette.primary.main
                      : cjbsTheme.palette.error.main,
                }}
                colSpan={2}
              >
                {custData.isAcs === "Y" ? "사용" : "차단"}
              </TD>
              <TH sx={{ width: "15%" }}>마지막 수정일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custData.modifiedAt ? custData.modifiedAt : "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustInfo;
