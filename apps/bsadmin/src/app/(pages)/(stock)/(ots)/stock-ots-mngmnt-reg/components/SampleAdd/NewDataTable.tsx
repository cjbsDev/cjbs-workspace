import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  DeletedButton,
  OutlinedButton,
  TD,
  TH,
  transformedNullToHyphon,
} from "cjbsDSTM";
import useCenteredPopup from "../../../../../../hooks/useCenteredPopup";
import MyIcon from "icon/MyIcon";

const DataTable = () => {
  const [sampleList, setSampleList] = useState([]);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { control, watch, setValue } = useFormContext();
  const srvcTypeWatch = watch("srvcTypeMc");
  console.log("srvcTypeWatch", srvcTypeWatch);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "otsSampleDetailList",
  });

  console.log("fields", fields);

  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/sampleSimpleListPopup`,
    "샘플 검색",
    1642,
    557,
  );

  useEffect(() => {
    const handleSampleData = (e) => {
      const { sampleLists, orderInfo, sampleInfo, sampleUkeyList } = e.detail;

      // Avoid adding duplicates
      sampleLists.forEach((newItem) => {
        if (!fields.some((item) => item.sampleUkey === newItem.sampleUkey)) {
          append(newItem); // Use append method to add new items to the field array
        }
      });

      setValue("orderInfo", orderInfo);
      setValue("sampleInfo", sampleInfo);
      // setValue("sampleUkeyList", sampleUkeyList);
    };

    window.addEventListener("mySampleSimpleData", handleSampleData);
    return () =>
      window.removeEventListener("mySampleSimpleData", handleSampleData);
  }, [append, fields, setValue]);

  // useEffect(() => {
  //   const handleSampleData = (e) => {
  //     const { sampleLists, orderInfo, sampleInfo, sampleUkeyList } = e.detail;
  //     const newData = sampleLists;
  //
  //     console.log("##########", sampleLists);
  //
  //     // Avoid adding duplicates
  //     const updatedList = [...fields];
  //     newData.forEach((newItem) => {
  //       if (!fields.some((item) => item.sampleUkey === newItem.sampleUkey)) {
  //         updatedList.push(newItem);
  //       }
  //     });
  //
  //     console.log("updatedList ==>>", updatedList);
  //
  //     // const upDateSampleUkeyList = updatedList.map((row) => row.sampleUkey);
  //     //
  //     // console.log("upDateSampleUkeyList", upDateSampleUkeyList);
  //
  //     setSampleList(updatedList);
  //     setValue("otsSampleDetailList", updatedList);
  //     setValue("orderInfo", orderInfo);
  //     setValue("sampleInfo", sampleInfo);
  //     setValue("sampleUkeyList", sampleUkeyList);
  //   };
  //
  //   window.addEventListener("mySampleSimpleData", handleSampleData);
  //   return () =>
  //     window.removeEventListener("mySampleSimpleData", handleSampleData);
  // }, [sampleList]);

  // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly number[] = [];
  //
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const toggleRowSelection = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    }
  };

  const handleDeleteSelected = () => {
    const rowsToDelete = [...selectedRows].sort((a, b) => b - a);
    rowsToDelete.forEach((index) => remove(index));
    setSelectedRows([]);
  };

  // const handleDeleteSelected = () => {
  //   // 선택된 항목의 인덱스를 찾아 remove 메서드를 호출
  //   fields.forEach((field, index) => {
  //     if (selected.includes(field.sampleUkey)) {
  //       remove(index);
  //     }
  //   });
  //   setSelected([]); // 선택 목록 초기화
  // };

  // const handleDeleteSelected = () => {
  //   const newSampleList = fields.filter(
  //     (item) => !selected.includes(item.sampleUkey),
  //   );
  //   console.log("NNNNNNNNNN", newSampleList);
  //   const selectedSampleUkeyList = newSampleList.map((row) => row.sampleUkey);
  //   console.log("NNNNNNNNNN", selectedSampleUkeyList);
  //   // remove(selectedSampleUkeyList);
  //   // setSampleList(newSampleList);
  //
  //   const rowsToDelete = [...newSampleList].sort((a, b) => b - a);
  //   rowsToDelete.forEach((index) => remove(index));
  //
  //   setSelected([]); // Clear selection after deletion
  // };

  const isSelected = (sampleUkey) => selected.includes(sampleUkey);

  const ssss = fields.length === 0 && srvcTypeWatch !== "BS_0100017006";

  return (
    <>
      {ssss && (
        <Stack
          sx={{ backgroundColor: cjbsTheme.palette.grey["200"], py: 5, mb: 1 }}
          spacing={0.5}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>버튼을 클릭하면 샘플을 추가 할 수 있습니다.</Typography>
          <OutlinedButton
            buttonName="샘플추가"
            size="small"
            onClick={openPopup}
          />
        </Stack>
      )}

      {fields.length !== 0 && (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography>(총 {fields.length}건)</Typography>
            <OutlinedButton
              buttonName="샘플추가"
              size="small"
              onClick={openPopup}
            />
            <DeletedButton buttonName="삭제" onClick={handleDeleteSelected} />
          </Stack>

          <TableContainer sx={{ mb: 1.5 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TH align="center"></TH>
                  <TH align="center">샘플 번호</TH>
                  <TH align="center">샘플명</TH>
                  <TH align="center">샘플종류</TH>
                  <TH align="center">Source</TH>
                  <TH align="center">Depth(GB)</TH>
                  <TH align="center">Taxon</TH>
                  <TH align="center">오더 번호</TH>
                  <TH align="center">서비스 타입</TH>
                  <TH align="center"></TH>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((item, index) => {
                  const {
                    sampleUkey,
                    sampleNm,
                    sampleTypeVal,
                    source,
                    depthVal,
                    depthMc,
                    taxonVal,
                    taxonCc,
                    orderId,
                    orderUkey,
                    srvcTypeVal,
                    srvcTypeMc,
                  } = transformedNullToHyphon(item);
                  // const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={sampleUkey}
                      // onClick={(event) => handleClick(event, sampleUkey)}
                      // selected={isSelected(sampleUkey)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TD padding="checkbox">
                        <Checkbox
                          size="small"
                          checked={selectedRows.includes(index)}
                          onChange={(e) =>
                            toggleRowSelection(index, e.target.checked)
                          }
                        />
                        {/*<Checkbox*/}
                        {/*  color="primary"*/}
                        {/*  checked={isSelected(sampleUkey)}*/}
                        {/*  inputProps={{*/}
                        {/*    "aria-labelledby": labelId,*/}
                        {/*  }}*/}
                        {/*/>*/}
                      </TD>
                      <TD align="center">{sampleUkey}</TD>
                      <TD align="center">{sampleNm}</TD>
                      <TD align="center">{sampleTypeVal}</TD>
                      <TD align="center">{source}</TD>
                      <TD align="center">{depthVal}</TD>
                      <TD align="center">{taxonVal}</TD>
                      <TD align="center">{orderId}</TD>
                      <TD align="center">{srvcTypeVal}</TD>
                      <TD align="center">
                        <IconButton onClick={() => remove(index)}>
                          <MyIcon
                            icon="trash"
                            size={18}
                            color={cjbsTheme.palette.error.main}
                            // color={
                            //   isDeleteDisabled
                            //     ? cjbsTheme.palette.grey["400"]
                            //     : cjbsTheme.palette.error.main
                            // }
                          />
                        </IconButton>
                      </TD>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default DataTable;
