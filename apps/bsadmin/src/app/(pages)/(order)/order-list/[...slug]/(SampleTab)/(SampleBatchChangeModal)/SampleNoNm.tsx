import React from "react";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

interface SampleNoNmProps {
  sampleUkeyList: string[];
}
const SampleNoNm = (props: SampleNoNmProps) => {
  const { sampleUkeyList } = props;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/sample/update?sampleUkeyList=${sampleUkeyList}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log(data.data);
  const getData = data.data;
  return (
    <TableContainer>
      <Table sx={{ textAlign: "center" }} size="small">
        <TableHead
          sx={{
            height: 40,
            backgroundColor: cjbsTheme.palette.grey["500"],
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                width: "50%",
                textAlign: "center",
                color: "white",
                borderRight: `1px solid ${cjbsTheme.palette.grey["300"]}`,
              }}
            >
              샘플번호
            </TableCell>
            <TableCell sx={{ textAlign: "center", color: "white" }}>
              샘플명
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            backgroundColor: cjbsTheme.palette.grey["50"],
          }}
        >
          {getData.map((item) => {
            return (
              <TableRow key={item.sampleId}>
                <TableCell
                  sx={{
                    textAlign: "center",
                    borderRight: `1px solid ${cjbsTheme.palette.grey["300"]}`,
                  }}
                >
                  {item.sampleId}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.sampleNm}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SampleNoNm;
