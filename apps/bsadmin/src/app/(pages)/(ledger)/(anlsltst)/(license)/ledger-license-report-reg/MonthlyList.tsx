import * as React from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  InputValidation,
  SelectBox,
  cjbsTheme,
  Fallback,
  ErrorContainer,
  OutlinedButton,
  TH,
  TD,
  ContainedButton,
} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { POST, GET } from "api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { monthlyViewAtom } from "../../../../../recoil/atoms/monthlyViewAtom";
import { addDays, subDays } from "date-fns";

const MonthlyList = (props: any) => {
  // const { field, remove, index, acct, perm, errors } = props;
  const { field, remove, index, errors } = props;
  const { getValues, setValue } = useFormContext();

  // 월비용 노출/미노출
  const [isMonthly, setIsMonthly] = useRecoilState(monthlyViewAtom);
  // 월비용 데이터
  const [monthlyData, setMonthlyData] = useState<any>({});
  const [sDate, setSDate] = useState<string>("");
  const [eDate, setEDate] = useState<string>("");
  // useEffect(() => {
  //   return () => {
  //   }
  // }, []);

  const standDate = () => {
    // const now = new Date("2024-03-01");
    const now = new Date();
    const nowDate: number = now.getDate();
    let startDate;
    let endDate;
    // const nowDate= 5;
    console.log("nowDate : ", nowDate);
    let startMonth: number = 0;
    let endMonth: number = 0;
    if (nowDate < 6) {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth() + 2));
      endMonth = endDate.getMonth();
    } else {
      startDate = new Date(now);
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth() + 1));
      endMonth = endDate.getMonth();
    }
    console.log("startMonth : ", startMonth);
    console.log("endMonth : ", endMonth);

    return [
      {
        start: subDays(new Date(startDate.setDate(1)), 1),
        end: addDays(new Date(endDate.setDate(5)), 0),
      },
    ];
  };

  // 월비용 조회하기
  const getMonthlyData = async () => {
    const getAnlsDttm = getValues("anlsDttm");
    const getTotalPrice = getValues("totalPrice");
    const getTotalSupplyPrice = getValues("totalSupplyPrice");

    if (getAnlsDttm === "" || getTotalPrice === "") {
      toast("분석일 및 합계금액이 입력된 경우만 조회가 가능합니다.");
      return false;
    }

    const apiUrl: string = `/anls/itst/cost/monthly?anlsDttm=${dayjs(
      getAnlsDttm,
    ).format("YYYY-MM-DD")}&totalSupplyPrice=${getTotalSupplyPrice}`;
    await GET(apiUrl, {})
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          // toast("조회 되었습니다.");
          setMonthlyData(response.data.anlsItstCostLcnsDetailList);
          setSDate(response.data.startDttm);
          setEDate(response.data.endDttm);
          setIsMonthly(true);
        } else {
          toast(response.message);
        }
      })
      .catch((error) => {
        console.error("GET request failed:", error);
        // toast(error.)
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>사용 기간</TH>
            <TD sx={{ width: "85%" }}>
              {isMonthly === true ? ` ${sDate} ~ ${eDate}` : " -"}
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>월비용</TH>
            <TD sx={{ width: "85%", p: 1 }}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <OutlinedButton
                  size="small"
                  buttonName="예상 월비용 조회"
                  onClick={() => getMonthlyData()}
                />
                <Typography variant="body2">
                  예상 월비용을 조회할 수 있습니다. 분석내역 또는 분석일 변경 시
                  재 조회해주세요.
                </Typography>
              </Stack>

              {isMonthly === true && (
                <>
                  <TableContainer sx={{ marginY: 1, width: "100%", mb: 0 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ textAlign: "center" }}>
                          {monthlyData.map((item, index) => {
                            const { anlsItstCostLcnsUkey, month, year } = item;
                            return (
                              <TH
                                key={anlsItstCostLcnsUkey}
                                sx={{}}
                                align="center"
                              >
                                {year}.{month}
                              </TH>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {monthlyData.map((item, index) => {
                            const { anlsItstCostLcnsUkey, price } = item;
                            return (
                              <TD
                                key={anlsItstCostLcnsUkey}
                                sx={{ width: "7%" }}
                                align="center"
                              >
                                {price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                원
                              </TD>
                            );
                          })}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonthlyList;
