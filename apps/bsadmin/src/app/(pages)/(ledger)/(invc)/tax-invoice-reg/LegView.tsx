"use client";

import React, { useCallback, useState } from "react";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  SkeletonLoading,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LoadingSvg from "public/svg/loading_wh.svg";
import AgncSearchModal from "../../../../components/AgncSearchModal";
import AgncAndInstName from "./components/AgncAndInstName";
import NGSSalesManagerSelectbox from "../../../../components/NGSSalesManagerSelectbox";
import InstSearchModal from "../../../../components/InstSearchModal";
import BusinessRegNo from "./components/BusinessRegNo";
import RepresentName from "./components/RepresentName";
import DynamicTable from "./components/DynamicTable";
import DynamicSumTable from "./components/DynamicSumTable";
import { POST } from "api";
import PaymentDynamicInfo from "./components/PaymentDynamicInfo";
import dayjs from "dayjs";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { agncModalShowAtom, instModalShowAtom } from "./atom";
import PblshrInst from "./components/PblshrInst";
import DynamicBasicInfo from "./components/DynamicBasicInfo";
import ActionBtns from "./components/ActionBtns";
import EtcInfo from "./components/EtcInfo";
import DynamicViews from "./components/DynamicViews";
import dynamic from "next/dynamic";

// const LazyAgncSearchModal = dynamic(
//   () => import("../../../../components/AgncSearchModal"),
//   {
//     ssr: false,
//     loading: () => <SkeletonLoading />,
//   },
// );

const LegView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [showAgncSearchModal, setShowAgncSearchModal] =
  //   useState<boolean>(false);
  // const [showInstSearchModal, setShowInstSearchModal] =
  //   useState<boolean>(false);
  // const [showAgncSearchModal, setShowAgncSearchModal] =
  //   useRecoilState(agncModalShowAtom);
  // const [showInstSearchModal, setShowInstSearchModal] =
  //   useRecoilState(instModalShowAtom);

  const defaultValues = {
    pymtInfoCc: "BS_1914001",
    invcProductDetailList: [
      {
        srvcCtgrMc: "BS_0100005001",
        anlsTypeMc: "",
        products: "",
        qnty: 0,
        unitPrice: 0,
        supplyPrice: 0,
      },
    ],
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form Data ==>>", data);
    const {
      invcProductDetailList,
      agncUkey,
      bsnsMngrUkey,
      pymtInfoCc,
      instUkey,
      pymtMngrNm,
      rcvEmail,
      memo,
      report,
      vat,
      totalPrice,
      totalSupplyPrice,
      // dpstDttm,
      dpstPrice,
      pyrNm,
      tnsfTargetAgncUkey,
    } = data;

    const dpstDttm = dayjs(data.dpstDttm).format("YYYY-MM-DD");

    const bodyData = {
      agncUkey,
      bsnsMngrUkey,
      dpstDttm,
      dpstPrice,
      pyrNm,
      instUkey,
      invcProductDetailList,
      memo,
      pymtInfoCc,
      pymtMngrNm,
      rcvEmail,
      report,
      tnsfTargetAgncUkey,
      totalPrice,
      totalSupplyPrice,
      vat,
    };

    try {
      const res = await POST(`/invc`, bodyData);
      console.log("Response", res);
      if (res.success) {
        router.push("/tax-invoice-list");
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 거래처 검색 모달
  // const handleAgncSearchModalOpen = () => {
  //   setShowAgncSearchModal(true);
  // };
  // const handleAgncSearchModalClose = useCallback(() => {
  //   console.log("TTTTTTTTTTTTTT");
  //   setShowAgncSearchModal(false);
  // }, [setShowAgncSearchModal]);

  // 기관 검색 모달
  // const handleInstSearchModalOpen = () => {
  //   setShowInstSearchModal(true);
  // };
  // const handleInstSearchModalClose = useCallback(() => {
  //   setShowInstSearchModal(false);
  // }, []);

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="세금계산서 등록" />
      </Box>

      {/* 기본정보 */}
      <DynamicBasicInfo />

      <DynamicViews />

      {/*/!* 결제정보 *!/*/}
      {/*<PaymentDynamicInfo />*/}

      {/*/!* 품명 *!/*/}
      {/*<DynamicTable />*/}
      {/*<DynamicSumTable />*/}

      {/*/!* 발행처 정보 *!/*/}
      {/*<PblshrInst />*/}

      {/*/!* 기타정보 *!/*/}
      {/*<EtcInfo />*/}

      <ActionBtns isLoading={isLoading} />

      {/*<LazyAgncSearchModal*/}
      {/*  onClose={handleAgncSearchModalClose}*/}
      {/*  open={showAgncSearchModal}*/}
      {/*  modalWidth={800}*/}
      {/*/>*/}

      {/*<InstSearchModal*/}
      {/*  onClose={handleInstSearchModalClose}*/}
      {/*  open={showInstSearchModal}*/}
      {/*  modalWidth={1000}*/}
      {/*/>*/}
    </Form>
  );
};

export default LegView;
