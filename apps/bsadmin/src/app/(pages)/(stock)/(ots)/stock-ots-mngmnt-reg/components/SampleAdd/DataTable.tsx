import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Checkbox,
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

const DataTable = () => {
  const [sampleList, setSampleList] = useState([]);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const { watch, setValue } = useFormContext();
  const srvcTypeWatch = watch("srvcTypeMc");
  console.log("srvcTypeWatch", srvcTypeWatch);

  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/sampleSimpleListPopup`,
    "샘플 검색",
    1642,
    557,
  );

  useEffect(() => {
    const handleSampleData = (e) => {
      const { sampleLists, orderInfo, sampleInfo, sampleUkeyList } = e.detail;
      const newData = sampleLists;

      console.log("##########", e.detail);

      // Avoid adding duplicates
      const updatedList = [...sampleList];
      newData.forEach((newItem) => {
        if (
          !sampleList.some((item) => item.sampleUkey === newItem.sampleUkey)
        ) {
          updatedList.push(newItem);
        }
      });

      console.log("updatedList ==>>", updatedList);

      const upDateSampleUkeyList = updatedList.map((row) => row.sampleUkey);

      console.log("upDateSampleUkeyList", upDateSampleUkeyList);

      setSampleList(updatedList);
      setValue("orderInfo", orderInfo);
      setValue("sampleInfo", sampleInfo);
      setValue("sampleUkeyList", sampleUkeyList);
    };

    window.addEventListener("mySampleSimpleData", handleSampleData);
    return () =>
      window.removeEventListener("mySampleSimpleData", handleSampleData);
  }, [sampleList]);

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleDeleteSelected = () => {
    const newSampleList = sampleList.filter(
      (item) => !selected.includes(item.sampleUkey),
    );
    setSampleList(newSampleList);
    setSelected([]); // Clear selection after deletion
  };

  const isSelected = (sampleUkey) => selected.includes(sampleUkey);

  const ssss = sampleList.length === 0 && srvcTypeWatch !== "BS_0100017006";

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

      {sampleList.length !== 0 && (
        <>
          <Stack direction="row" spacing={1}>
            <Typography>{sampleList.length}</Typography>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleList.map((item, index) => {
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
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={sampleUkey}
                      onClick={(event) => handleClick(event, sampleUkey)}
                      selected={isSelected(sampleUkey)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TD padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isSelected(sampleUkey)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TD>
                      <TD align="center">{sampleUkey}</TD>
                      <TD align="center">{sampleNm}</TD>
                      <TD align="center">{sampleTypeVal}</TD>
                      <TD align="center">{source}</TD>
                      <TD align="center">{depthVal}</TD>
                      <TD align="center">{taxonVal}</TD>
                      <TD align="center">{orderId}</TD>
                      <TD align="center">{srvcTypeVal}</TD>
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
