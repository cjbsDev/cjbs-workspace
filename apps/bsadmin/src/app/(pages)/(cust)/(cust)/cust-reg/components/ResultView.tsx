import React from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cjbsTheme, ContainedButton } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

const ResultView = ({ data, onClose }) => {
  const { setValue, clearErrors } = useFormContext();

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleSetValues = (data) => {
    const {
      ebcEmail,
      ebcFullNm,
      ebcInstNm,
      ebcIsSchl,
      ebcNtly,
      ebcSubEmail,
      ebcTitle,
      ebcUid,
    } = data;
    setValue("ebcUid", ebcUid);
    setValue("ebcEmail", ebcEmail);
    setValue("ebcFullNm", ebcFullNm);
    setValue("ebcInstNm", ebcInstNm);
    setValue("ebcIsSchl", ebcIsSchl);
    setValue("ebcNtly", ebcNtly);
    setValue("ebcSubEmail", ebcSubEmail);
    setValue("ebcTitle", ebcTitle);
    onClose();
    clearErrors("custNm");
  };
  return (
    <>
      {isEmpty(data) ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: 60,
            backgroundColor: cjbsTheme.palette.grey["200"],
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">계정을 검색해주세요.</Typography>
        </Stack>
      ) : data !== "NO_DATA" ? (
        <div>
          <Box>
            <Typography variant="body2">검색결과</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2">{data.ebcEmail}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{data.ebcFullNm}</Typography>
                    </TableCell>
                    <TableCell>
                      <ContainedButton
                        buttonName="선택"
                        size="small"
                        onClick={() => handleSetValues(data)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" spacing={1} alignItems="center"></Stack>
          </Box>
        </div>
      ) : (
        <Typography variant="body2">검색 결과가 없습니다.</Typography>
      )}
    </>
  );
};

export default ResultView;
