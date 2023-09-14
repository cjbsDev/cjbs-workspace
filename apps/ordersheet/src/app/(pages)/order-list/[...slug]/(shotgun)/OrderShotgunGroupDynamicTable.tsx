import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack, styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, ToggleButton, ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  cjbsTheme, ConfirmModal,
  ContainedButton,
  InputValidation, OutlinedButton,
  SelectBox,
  UnStyledButton,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyIcon from "icon/MyIcon";
import axios from "axios";
import ExRow from "../../../order/shotgun/(service)/(contents)/ExRow";
import TableHeader from "../../../order/shotgun/(service)/(contents)/TableHeader";
import TableNewRows from "./TableNewRows";
import LoadingSvg from "@public/svg/loading_wh.svg";
import {useRecoilState} from "recoil";
import {groupUseStatusAtom} from "@app/recoil/atoms/groupUseStatusAtom";
import {fileIdValueAtom} from "@app/recoil/atoms/fileIdValueAtom";
import {testAtom} from "@app/recoil/atoms/testAtom";


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0),
    border: "1px solid #CED4DA",
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      border: "1px solid #CED4DA",
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
      border: "1px solid #CED4DA",
    },
  },
}));

const OrderShotgunGroupSampleDynamicTable = (props: any) => {
  // console.log("$$$$$$$$$$", props.serviceType);
  const {sampleFields} = props;
  const { watch, control, getValues, formState,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupCmprAnls", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [isGroupUse, setIsGroupUse] = useRecoilState(groupUseStatusAtom);
  const [groupList, setgroupList] = useRecoilState(testAtom);
  const [isGroupCmprAnls, setIsGroupCmprAnls] = useState<string>("N");
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [groupOptionData, setGroupOptionData] = useState([]);

  useEffect(() => {
    console.log("groupList : ", groupList)

    setGroupOptionData(groupList);
    setIsGroupCmprAnls(isGroupUse);
  }, [isGroupUse])

  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const handleServiceTypeChange = () => {
    resetGroupTable();
    let setGroupList = [];
    let groupDataList = [];
    let groupData = {};

    sampleFields.map((field, index) => {
      const getData = getValues(`sample.[${index}].groupNm`);
      console.log(getData);
      if( getData !== '') setGroupList.push(getData);
    });
    let uniqueGroupList = [...new Set(setGroupList)];
    console.log(uniqueGroupList);
    uniqueGroupList.forEach((item) => {
      groupData = { value: item, optionName: item };
      groupDataList.push(groupData);
    });
    console.log(groupDataList);

    setGroupOptionData(groupDataList);
    handleAlertClose();
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === null) return;
    if (newAlignment === 'N') {
      resetGroupTable()
    }
    setValue("isGroupCmprAnls", newAlignment);
    setIsGroupCmprAnls(newAlignment);
  };

  // group table delete
  const resetGroupTable = () => {
    console.log("fields : ", fields);
    fields.forEach((item) => {
      remove(item);
    });
  };

  // useEffect(() => {
  //   handleAddFields(1)
  // }, [])

  const handleAddFields = (count:any) => {
    console.log("Count~!~!", count);
    // 입력된 수만큼 항목을 추가합니다.
    for (let i = 0; i < count; i++) {
      append({
        // sampleNm: "",
        // groupNm: "",
        // source: "",
        // sampleCategoryCc: "",
        // memo: "",
        // selfQcResultFileId: 0
      });
    }
  };

  return (
    <>

      <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mb: 3 }}>
        <ContainedButton
          buttonName="저장"
          onClick={() => handleAlertOpen()}
        />
      </Stack>

      <ConfirmModal
        alertBtnName="확인"
        alertMainFunc={handleServiceTypeChange}
        onClose={handleAlertClose}
        open={alertModalOpen}
        mainMessage={
          "그룹 수정 시 그룹분석리스트(유료)가 초기화 됩니다.\n"
        }
        subMessage={"수정하시겠습니까?"}
      />

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle1">그룹 비교 분석 리스트 (유료)</Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 1, mb: 3, width: "100%" }}
      >
        <StyledToggleButtonGroup
          color="primary"
          value={isGroupCmprAnls}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <ToggleButton value="Y" sx={{ width: "49%" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography variant="body2">사용</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="N" sx={{ width: "49%" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography variant="body2">미사용</Typography>
            </Stack>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Stack>

      <InputValidation inputName="isGroupCmprAnls" sx={{width: "80px"}} defaultValue={isGroupCmprAnls} />

      <Stack
        spacing={0}
        sx={{
          display: isGroupCmprAnls === 'N' ? 'none' : '',
        }}
      >
        <Box
          alignItems="start"
          sx={{
            backgroundColor: cjbsTheme.palette.grey["50"],
            paddingX: 5,
            paddingY: 3,
            mb: 2,
          }}
        >
          <ul>
            <li>
              <Typography variant="body2">
                위 샘플리스트에 작성된 그룹명을 이용하여 그룹 비교 분석의 조건을 작성해주세요
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                하나의 비교 당 최대 5개까지 가능합니다
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                샘플리스트의 그룹 수정 시 기존에 입력한 리스트는 초기화됩니다
              </Typography>
            </li>
          </ul>
        </Box>

        <Stack direction="row" spacing={1} justifyContent="end">
          <InputValidation
            inputName="countGroup"
            type="number"
            sx={{width: "80px"}}
          />
          <ContainedButton
            buttonName="행 추가"
            size="small"
            color={"secondary"}
            onClick={() => handleAddFields(getValues("countGroup"))}
          />
        </Stack>
        <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
          <Table>
            <TableHeader serviceType={'group'} />
            <TableBody>
              <ExRow serviceType={'group'} />
              {fields.map((field, index) => {
                return (
                  <TableNewRows
                    key={field.id}
                    field={field}
                    remove={remove}
                    index={index}
                    errors={errors}
                    serviceType={'group'}
                    groupOptionData={groupOptionData}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>


    </>
  );
};

export default OrderShotgunGroupSampleDynamicTable;
