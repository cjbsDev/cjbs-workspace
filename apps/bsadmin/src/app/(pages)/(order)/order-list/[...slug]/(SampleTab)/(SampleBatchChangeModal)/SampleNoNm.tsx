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
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>샘플번호</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default SampleNoNm;
