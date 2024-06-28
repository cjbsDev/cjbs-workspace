import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/ko";

dayjs.extend(localeData);
dayjs.locale("ko");

export const reqReturnListData = [
  { value: "dnaReturnReq", optionName: "DNA 반송 요청" },
  { value: "sampleReturnReq", optionName: "샘플 반송 요청" },
  // { value: "sampleReturnReq", optionName: "보관요청" },
];
export const emailReceiveSettingData = [
  { value: "agncLeaderRcpn", optionName: "연구책임자" },
  { value: "ordrAplcRcpn", optionName: "신청인" },
  { value: "etcRcpn", optionName: "추가(직접입력)" },
];

export const fastTrackData = [
  { value: "Y", optionName: "Fast Track으로 진행합니다." },
];

export const yieldData = [
  {
    value: "BS_0100010001",
    optionName: "없음",
  },
  {
    value: "BS_0100010002",
    optionName: "2G",
  },
  {
    value: "BS_0100010003",
    optionName: "5G",
  },
  {
    value: "BS_0100010004",
    optionName: "10G",
  },
  {
    value: "BS_0100010005",
    optionName: "20G",
  },
  {
    value: "BS_0100010007",
    optionName: "50000",
  },
];

export const vrfcData = [
  { value: "Y", optionName: "Y" },
  { value: "N", optionName: "N" },
  { value: "NA", optionName: "N/A" },
];

export const isSendEmailData = [
  { value: "Y", optionName: "Y" },
  { value: "N", optionName: "N" },
];

export const dateTypeCcData = [
  { value: "BS_0811001", optionName: "오더 생성일" },
  { value: "BS_0811002", optionName: "샘플 접수일" },
  { value: "BS_0811003", optionName: "Lib 완료일" },
  { value: "BS_0811004", optionName: "분석 완료일" },
  { value: "BS_0811005", optionName: "완료 통보일" },
];

// 2021년 부터 올해까지 연도 리스트
const startYear = 2021;
const currentYear = dayjs().year();
// const currentYear = 2023;
const yearOptions = [];

for (let year = startYear; year <= currentYear; year++) {
  yearOptions.push({ value: year, optionName: year.toString() + "년" });
}

export const dashboardYearData = yearOptions;

// 월 리스트
const monthNames = dayjs.months();
const monthArray = monthNames.map((name, index) => ({
  value: index + 1,
  optionName: name,
}));

export const dashboardMonthData = monthArray;

// export const dashboardMonthData = [
//   { value: 1, optionName: "1월" },
//   { value: 2, optionName: "2월" },
//   { value: 3, optionName: "3월" },
//   { value: 4, optionName: "4월" },
//   { value: 5, optionName: "5월" },
//   { value: 6, optionName: "6월" },
//   { value: 7, optionName: "7월" },
//   { value: 8, optionName: "8월" },
//   { value: 9, optionName: "9월" },
//   { value: 10, optionName: "10월" },
//   { value: 11, optionName: "11월" },
//   { value: 12, optionName: "12월" },
// ];

export const dashboardIdleData = [
  { value: 3, optionName: "3개월" },
  { value: 6, optionName: "6개월" },
  { value: 9, optionName: "9개월" },
  { value: 12, optionName: "12개월" },
  { value: 18, optionName: "18개월" },
  { value: 24, optionName: "24개월" },
  { value: 36, optionName: "36개월" },
];

export const quarterListData = [
  { value: 1, optionName: "1분기" },
  { value: 2, optionName: "2분기" },
  { value: 3, optionName: "3분기" },
  { value: 4, optionName: "4분기" },
];

export const halfListData = [
  { value: 1, optionName: "상반기" },
  { value: 2, optionName: "하반기" },
];

export const periodListData = [
  { name: "월", value: "BS_2100003" },
  { name: "분기", value: "BS_2100004" },
  { name: "반기", value: "BS_2100005" },
  { name: "년", value: "BS_2100006" },
];

export const groupListData = [
  { name: "기관", value: "BS_2200001" },
  { name: "거래처", value: "BS_2200002" },
];

export const groupDepartMngrListData = [
  { value: "BS_0100003011", optionName: "NGS분석팀" },
  { value: "BS_0100003012", optionName: "NGS영업팀" },
];

export const taxonListData = [
  { taxonName: "taxonBCnt", taxonIconName: "B" },
  { taxonName: "taxonECnt", taxonIconName: "E" },
  { taxonName: "taxonACnt", taxonIconName: "A" },
];
