import React from "react";
import {
  Alert,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Form, SingleDatePicker, TD, TH } from "cjbsDSTM";
import AccountStatementInput from "./AccountStatementInput";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import TaxInvoiceNumber from "../../../../../../components/NumberFormat/TaxInvoiceNumber";

interface AccountStatementFormProps {
  onSubmit: (data: any) => Promise<void>;
}

const AccountStatementForm = ({ onSubmit }: AccountStatementFormProps) => {
  const params = useParams();
  const invcUkey = params.slug;
  const { data } = useSWR(`/invc/${invcUkey}`, fetcher, {
    suspense: true,
  });

  console.log("YUYUYUYU", data);

  const { issuDttm, pymtInfoCc } = data;

  const defaultValues = {
    issuDttm: issuDttm === null ? new Date() : new Date(issuDttm),
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      id="accountStatementForm"
    >
      <TableContainer sx={{ mb: 1 }}>
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
            {pymtInfoCc === "BS_1914002" && (
              <TableRow>
                <TH sx={{ width: "35%" }}>세금계산서 번호</TH>
                <TD>
                  {/*<AccountStatementInput />*/}
                  <TaxInvoiceNumber />
                </TD>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Alert severity="error">
        세금계산서 발행 후에는 요청 내용을 수정할 수 없습니다. 발행 전에 다시
        한번 확인해 주세요.
      </Alert>
    </Form>
  );
};

export default AccountStatementForm;
