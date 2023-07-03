"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertModal,
  Checkbox,
  ContainedButton,
  LinkButton,
  Form,
} from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, DialogContent, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const ListDashboardPage = () => {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const onSubmit = (data) => console.log(data);

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = useForm();

  return (
    <Box>
      <Form onSubmit={onSubmit}>
        <Typography variant={"title1"}>Dashboard Page.</Typography>
        <Stack direction={"row"} spacing={1}>
          <LinkButton
            buttonName="고객관리"
            onClick={() => router.push("/cust/cust-list")}
          />
          <LinkButton
            buttonName="주문"
            onClick={() => router.push("/order/order-list")}
          />
          <LinkButton
            buttonName="거래처(PI) 등록"
            onClick={() => router.push("/cust/agnc-pi-add")}
          />

          <Checkbox
            defaultValue="Y"
            register={register}
            inputName="isSpecialMngFlag"
            labelText="특별 관리(SP)하는 거래처 입니다"
          />
        </Stack>
        <ContainedButton
          buttonName="Alert"
          onClick={handleAlertOpen}
          color="error"
        />
        <AlertModal
          alertBtnName="삭제"
          alertMainFunc={handleAlertClose}
          onClose={handleAlertClose}
          open={alertModalOpen}
          mainMessage={
            "거래처(PI)를 삭제하면 거래처(PI) 구성원에서도 제외됩니다."
          }
          subMessage={"삭제를 진행하시겠습니까?"}
        />
      </Form>
    </Box>
  );
};

export default ListDashboardPage;
