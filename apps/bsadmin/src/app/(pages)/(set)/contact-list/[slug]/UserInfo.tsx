import { TH, TD, cjbsTheme } from "cjbsDSTM";
import useSWR from "swr";
import {
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Box,
} from "@mui/material";
import { fetcher } from "api";

interface UserInfoProps {
  slug: string;
}
/**
 * 담당자 정보
 * 기본 정보, 추가 정보
 *
 */

const UserInfo: React.FC<UserInfoProps> = ({ slug }) => {
  const { data: userData } = useSWR(`/user/detail/${slug}`, fetcher, {
    suspense: true,
  });

  const userDetail = userData.userDetail;
  const mngAngcDetailList = userData.mngAngcDetail.mngAgncList;
  const mngAngcCnt = userData.mngAngcDetail.mngAgncCnt;

  //console.log("userData", userData);
  //console.log("mngAngcDetailList", mngAngcDetailList);

  return (
    <>
      <Typography variant="subtitle1">기본 정보</Typography>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {userDetail.email ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <Box>{userDetail.nm ?? "-"}</Box>
              </TD>
              <TH sx={{ width: "15%" }}>영문 이니셜</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.nmEnInit ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>연락처</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.tel ?? "-"}
              </TD>

              {/* 아이디 email, 이름 nm, 영문 이니셜 nmEnInit, 연락처 tel, 부서 departVal, 가입일 singupAt, 최근 접속일 lastLoginAt, 권한 authVal, 상태 statusVal*/}

              <TH sx={{ width: "15%" }}>부서</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.departVal ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>가입일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.singupAt ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>최근 접속일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.lastLoginAt ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>권한</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.authVal ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {userDetail.statusVal ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">추가 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>담당 고객(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {mngAngcCnt === 0 ? (
                  <Box sx={{ textAlign: "center" }}>-</Box>
                ) : (
                  mngAngcDetailList.map((dataItem: any, index: number) => (
                    <Box key={index}>
                      {dataItem.instNm} ({dataItem.agncNm})
                    </Box>
                  ))
                )}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserInfo;
