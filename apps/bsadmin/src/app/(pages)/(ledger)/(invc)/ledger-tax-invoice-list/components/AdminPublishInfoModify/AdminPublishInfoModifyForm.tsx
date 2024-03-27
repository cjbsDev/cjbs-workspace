import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Alert,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Form, SingleDatePicker, TD, TH } from "cjbsDSTM";
import AccountStatementInput from "../AccountStatementModal/AccountStatementInput";

interface AdminPublishInfoModifyFormProps {
  onSubmit: (data: any) => Promise<void>;
}
const AdminPublishInfoModifyForm = ({
  onSubmit,
}: AdminPublishInfoModifyFormProps) => {
  const params = useParams();
  const invcUkey = params.slug;
  const { data } = useSWR(`/invc/${invcUkey}`, fetcher, {
    suspense: true,
  });
  const { issuDttm, invcNum } = data;
  // console.log("INVOICE INIT DATA121212 ==>>", issuDttm, invcNum);

  const defaultValues = {
    issuDttm: new Date(issuDttm),
    invcNum: invcNum.replace(/-/g, ""),
  };
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      id="accountStatementForm"
    >
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "35%" }}>발행일</TH>
              <TD>
                <SingleDatePicker
                  inputName="issuDttm"
                  required={true}
                  textAlign="end"
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "35%" }}>세금계산서 번호</TH>
              <TD>
                <AccountStatementInput />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/*<Alert severity="error">*/}
      {/*  세금계산서 발행 후에는 요청 내용을 수정할 수 없습니다. 발행 전에 다시*/}
      {/*  한번 확인해 주세요.*/}
      {/*</Alert>*/}
    </Form>
  );
};

export default AdminPublishInfoModifyForm;
