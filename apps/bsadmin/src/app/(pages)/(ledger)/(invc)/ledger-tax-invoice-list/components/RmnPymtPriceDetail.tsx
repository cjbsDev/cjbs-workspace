import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";

interface RmnPymtPriceDetailProps {
  agncUkey: string;
  pymtInfoCc?: string;
}

const RmnPymtPriceDetail = ({
  agncUkey,
  pymtInfoCc,
}: RmnPymtPriceDetailProps) => {
  console.log("pymtInfoCc ++++++++", pymtInfoCc);

  const { data } = useSWR(
    () =>
      agncUkey !== "" || undefined
        ? `/invc/list/rmn/${
            pymtInfoCc === "BS_1914004" ? "tnsf" : "pymt"
          }/price/${agncUkey}`
        : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Rmn Payment Price Detail ==>>", data);

  const isTransfer = pymtInfoCc === "BS_1914004";
  const dataList = isTransfer
    ? data.rmnTnsfPriceListDetailList
    : data.rmnPymtPriceListDetailList;

  return (
    <TableContainer
      sx={{ border: `1px solid ${cjbsTheme.palette.grey["300"]}`, mt: 2 }}
    >
      <Table size="small">
        <TableHead>
          {isTransfer ? (
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">거래처명</TableCell>
              <TableCell align="right">이관 전 금액</TableCell>
              <TableCell align="right">처리금액</TableCell>
              <TableCell align="right">이관 후 금액</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">서비스 분류</TableCell>
              <TableCell align="center">분석 내역서</TableCell>
              <TableCell align="right">분석일</TableCell>
              <TableCell align="right">분석비용</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {dataList.length > 0 ? (
            dataList.map((item, index) => {
              return (
                <TableRow key={isTransfer ? item.invcUkey : item.anlsItstUkey}>
                  {/* 테이블 로우 내용 */}
                  <TableCell>{index + 1}</TableCell>
                  {isTransfer ? (
                    <>
                      <TableCell align="center">{item.tnsfTypeVal}</TableCell>
                      <TableCell align="center">{item.agncNm}</TableCell>
                      <TableCell align="right">
                        {formatNumberWithCommas(item.preTnsfPrice)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumberWithCommas(item.prcsPrice)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumberWithCommas(
                          item.preTnsfPrice + item.prcsPrice,
                        )}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="center">{item.srvcCtgrMcVal}</TableCell>
                      <TableCell align="center">{item.anlsItstUkey}</TableCell>
                      <TableCell align="right">{item.anlsDttm}</TableCell>
                      <TableCell align="right">
                        {formatNumberWithCommas(item.anlsPrice)}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" sx={{ py: 2 }}>
                  데이터가 없습니다.
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {/*{rmnTnsfPriceListDetailList.length > 0 ? (*/}
          {/*  rmnTnsfPriceListDetailList.map(*/}
          {/*    (*/}
          {/*      item: {*/}
          {/*        agncNm: string;*/}
          {/*        instNm: string;*/}
          {/*        invcId: number;*/}
          {/*        invcUkey: string;*/}
          {/*        prcsPrice: number;*/}
          {/*        preTnsfPrice: number;*/}
          {/*        tnsfTypeCc: string;*/}
          {/*        tnsfTypeVal: string;*/}
          {/*      },*/}
          {/*      index: number,*/}
          {/*    ) => {*/}
          {/*      const {*/}
          {/*        agncNm,*/}
          {/*        instNm,*/}
          {/*        invcId,*/}
          {/*        invcUkey,*/}
          {/*        prcsPrice,*/}
          {/*        preTnsfPrice,*/}
          {/*        tnsfTypeCc,*/}
          {/*        tnsfTypeVal,*/}
          {/*      } = item;*/}

          {/*      return (*/}
          {/*        <TableRow key={invcUkey}>*/}
          {/*          <TableCell>{index + 1}</TableCell>*/}
          {/*          <TableCell align="center">{tnsfTypeVal}</TableCell>*/}
          {/*          <TableCell align="center">{agncNm}</TableCell>*/}
          {/*          <TableCell align="right">*/}
          {/*            {formatNumberWithCommas(preTnsfPrice)}*/}
          {/*          </TableCell>*/}
          {/*          <TableCell align="right">*/}
          {/*            {formatNumberWithCommas(prcsPrice)}*/}
          {/*          </TableCell>*/}
          {/*          <TableCell align="right">*/}
          {/*            {formatNumberWithCommas(preTnsfPrice + prcsPrice)}*/}
          {/*          </TableCell>*/}
          {/*        </TableRow>*/}
          {/*      );*/}
          {/*    },*/}
          {/*  )*/}
          {/*) : (*/}
          {/*  <TableRow>*/}
          {/*    <TableCell colSpan={5} align="center">*/}
          {/*      <Typography variant="body2" sx={{ py: 2 }}>*/}
          {/*        데이터가 없습니다.*/}
          {/*      </Typography>*/}
          {/*    </TableCell>*/}
          {/*  </TableRow>*/}
          {/*)}*/}

          {/*{rmnPymtPriceListDetailList.length > 0 ? (*/}
          {/*  rmnPymtPriceListDetailList.map(*/}
          {/*    (*/}
          {/*      item: {*/}
          {/*        srvcCtgrMc: string;*/}
          {/*        srvcCtgrMcVal: string;*/}
          {/*        anlsItstUkey: string;*/}
          {/*        anlsDttm: string;*/}
          {/*        anlsPrice: number;*/}
          {/*      },*/}
          {/*      index: number,*/}
          {/*    ) => {*/}
          {/*      const {*/}
          {/*        srvcCtgrMc,*/}
          {/*        srvcCtgrMcVal,*/}
          {/*        anlsItstUkey,*/}
          {/*        anlsDttm,*/}
          {/*        anlsPrice,*/}
          {/*      } = item;*/}

          {/*      return (*/}
          {/*        <TableRow key={anlsItstUkey}>*/}
          {/*          <TableCell>{index + 1}</TableCell>*/}
          {/*          {pymtInfoCc === "BS_1914004" ? (*/}
          {/*            ""*/}
          {/*          ) : (*/}
          {/*            <>*/}
          {/*              <TableCell align="center">{srvcCtgrMcVal}</TableCell>*/}
          {/*              <TableCell align="center">{anlsItstUkey}</TableCell>*/}
          {/*              <TableCell align="right">{anlsDttm}</TableCell>*/}
          {/*              <TableCell align="right">*/}
          {/*                {formatNumberWithCommas(anlsPrice)}*/}
          {/*              </TableCell>*/}
          {/*            </>*/}
          {/*          )}*/}
          {/*        </TableRow>*/}
          {/*      );*/}
          {/*    },*/}
          {/*  )*/}
          {/*) : (*/}
          {/*  <TableRow>*/}
          {/*    <TableCell colSpan={5} align="center">*/}
          {/*      <Typography variant="body2" sx={{ py: 2 }}>*/}
          {/*        데이터가 없습니다.*/}
          {/*      </Typography>*/}
          {/*    </TableCell>*/}
          {/*  </TableRow>*/}
          {/*)}*/}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RmnPymtPriceDetail;
