import { formatPhoneNumber } from "cjbsDSTM";
import Dayjs from "dayjs";

export const getColumns = (goDetailPage: () => void) => [
  {
    name: "아이디",
    selector: (row: { email: string }) => row.email,
    minWidth: "250px",
    allowOverflow: true,
  },
  {
    name: "이름",
    selector: (row: { nm: string }) => row.nm,
    // width: "100px",
    allowOverflow: true,
    // center: true,
  },
  {
    name: "영문 이니셜",
    selector: (row: { nmEnInit: string }) => row.nmEnInit,
    // width: "200px",
    allowOverflow: true,
  },
  {
    name: "연락처",
    selector: (row: { tel: string }) => formatPhoneNumber(row.tel),
    // width: "150px",
    right: true,
  },
  {
    name: "부서",
    center: true,
    selector: (row: { departVal: string }) => row.departVal,
  },
  {
    name: "권한",
    selector: (row: { authVal: string }) => row.authVal,
    center: true,
    width: "100px",
  },
  {
    name: "가입일",
    right: true,
    selector: (row: { signupAt: any }) =>
      row.signupAt && Dayjs(row.signupAt).format("YYYY-MM-DD"),
    width: "150px",
  },
  {
    name: "최근 접속일",
    right: true,
    selector: (row: { lastLoginAt: any }) =>
      row.lastLoginAt && Dayjs(row.lastLoginAt).format("YYYY-MM-DD"),
    width: "150px",
  },
  {
    name: "상태",
    center: true,
    // width: "100px",
    selector: (row: { statusVal: string }) => row.statusVal,
  },
];
