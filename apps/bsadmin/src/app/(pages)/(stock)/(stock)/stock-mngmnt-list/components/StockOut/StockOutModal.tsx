import React, { useState } from "react";
import {
  ContainedButton,
  EA,
  Form,
  InputValidation,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  DialogContent,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import { useSearchParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import AmountFormat from "../../../../../../components/NumberFormat/AmountFormat";
import dayjs from "dayjs";
import { POST } from "api";
import { toast } from "react-toastify";
import { standDate } from "../../../../../../func/standDate";
import HsptOutRow from "./HsptOutRow";

interface StockOutModalProps extends ModalContainerProps {
  stockUkey: string;
  isGutInside: string;
}

interface FormDataProps {
  outDttm: string | number | Date | dayjs.Dayjs | null | undefined;
  qnty: string;
}

const StockOutModal = ({
  onClose,
  open,
  modalWidth,
  stockUkey,
  isGutInside,
}: StockOutModalProps) => {
  // const searchParams = useSearchParams();
  // const stockUkey = searchParams.get("stockUkey");
  // const isGutInside = searchParams.get("isGutInside");
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    outDttm: new Date(),
  };

  const onSubmit = async (data: FormDataProps) => {
    // console.log("입고 전송폼 데이타 ==>>", data);
    // {
    //   "memo": "string",
    //   "outDttm": "string",
    //   "qnty": 0,
    //   "stockHsptUkey": "string",
    //   "stockUkey": "string"
    // }
    setIsLoading(true);
    const reqBody = {
      ...data,
      stockUkey: stockUkey,
      outDttm: dayjs(data.outDttm).format("YYYY-MM-DD"),
      qnty: Number(data.qnty.replaceAll(",", "")),
    };

    console.log("REQ BODY", reqBody);

    try {
      const res = await POST(`/stock/out`, reqBody);
      if (res.success) {
        console.log("SUCCESS", res);
        toast("출고가 완료되었습니다.");
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("발행 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        {isGutInside === "Y" ? "GutInside 출고 처리" : "출고 처리"}
      </ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="stockOutForm"
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "25%" }}>출고 날짜</TH>
                  <TD>
                    <SingleDatePicker
                      inputName="outDttm"
                      required={true}
                      includeDateIntervals={standDate()}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>수량</TH>
                  <TD>
                    <InputValidation
                      inputName="qnty"
                      required={true}
                      errorMessage="수량를 입력해 주세요."
                      sx={{
                        width: 160,
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
                        },
                      }}
                      inputMode="numeric"
                      InputProps={{
                        inputComponent: (props) => (
                          <AmountFormat
                            name={"qnty"}
                            priceValue={defaultValues.qnty}
                            {...props}
                          />
                        ),
                        endAdornment: <EA />,
                      }}
                    />
                  </TD>
                </TableRow>

                {isGutInside === "Y" && <HsptOutRow />}

                <TableRow>
                  <TH>
                    메모<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={3}
                      inputName="memo"
                      placeholder="메모"
                      maxLength={500}
                      maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="취소" onClick={onClose} color="secondary" />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="stockOutForm"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default StockOutModal;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
