import React from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { OutlinedButton, TD, TH } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import OrderTable1 from "./components/OrderTable1";
import OrderTable2 from "./components/OrderTable2";
import OrderTable3 from "./components/OrderTable3";

const OrderTab = () => {
  const router = useRouter();
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/detail/${orderUkey}`, fetcher, {
    suspense: true,
  });

  // console.log("주문 정보", data);

  const { agncInfo, orderInfo, mngrInfo, orshUkey, orshPath, memo } = data;

  return (
    <>
      {/*<Typography variant="subtitle1" sx={{ mb: 1 }}>*/}
      {/*  거래처(PI) 및 신청인 정보*/}
      {/*</Typography>*/}
      {/*<OrderTable1 data={agncInfo} />*/}

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle1">주문 정보</Typography>

        {orshUkey !== null && (
          <OutlinedButton
            buttonName="주문서 보기"
            size="small"
            color="secondary"
            sx={{ color: "black" }}
            endIcon={<MyIcon icon="cheveron-right" size={18} />}
            onClick={() => router.push(orshPath + "?from=order-list")}
          />
        )}
      </Stack>
      <OrderTable2 data={orderInfo} />

      {/*<Typography variant="subtitle1" sx={{ mb: 1 }}>*/}
      {/*  담당자 정보*/}
      {/*</Typography>*/}
      {/*<OrderTable3 data={mngrInfo} />*/}

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        메모
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                {memo}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderTab;
