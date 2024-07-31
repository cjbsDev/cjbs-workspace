import React, { useState } from "react";
import {
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
  Won,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  DialogContent,
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

interface StockInModalProps extends ModalContainerProps {
  unpr: number;
}

interface FormData {
  inDttm: string | number | Date | dayjs.Dayjs | null | undefined;
  unpr: string;
  qnty: string;
  stockUkey: string;
}

const StockInModal = ({
  onClose,
  open,
  modalWidth,
  unpr,
  stockUkey,
}: StockInModalProps) => {
  const searchParams = useSearchParams();
  // const stockUkey = searchParams.get("stockUkey");
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    inDttm: new Date(),
    unpr: unpr,
  };

  const onSubmit = async (data: FormData) => {
    console.log("입고 전송폼 데이타 ==>>", data);
    setIsLoading(true);
    const reqBody = {
      ...data,
      stockUkey: stockUkey,
      inDttm: dayjs(data.inDttm).format("YYYY-MM-DD"),
      unpr: Number.isNaN(Number(data.unpr))
        ? Number(data.unpr.replaceAll(",", ""))
        : data.unpr,
      qnty: Number(data.qnty.replaceAll(",", "")),
    };

    console.log("REQ BODY", reqBody);

    try {
      const res = await POST(`/stock/in`, reqBody);
      if (res.success) {
        console.log("SUCCESS", res);
        toast("입고가 완료되었습니다.");
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
      <ModalTitle onClose={onClose}>입고 처리</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="stockInForm"
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "25%" }}>입고 날짜</TH>
                  <TD>
                    <SingleDatePicker
                      inputName="inDttm"
                      required={true}
                      includeDateIntervals={standDate()}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>단가</TH>
                  <TD>
                    <InputValidation
                      inputName="unpr"
                      required={true}
                      errorMessage="단가를 입력해 주세요."
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
                            name={"unpr"}
                            priceValue={defaultValues.unpr}
                            {...props}
                          />
                        ),
                        endAdornment: <Won />,
                      }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>수량</TH>
                  <TD>
                    <InputValidation
                      inputName="qnty"
                      required={true}
                      errorMessage="단가를 입력해 주세요."
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
        <OutlinedButton
          buttonName="취소"
          onClick={onClose}
          color="secondary"
          size="small"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="stockInForm"
          size="small"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default StockInModal;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
