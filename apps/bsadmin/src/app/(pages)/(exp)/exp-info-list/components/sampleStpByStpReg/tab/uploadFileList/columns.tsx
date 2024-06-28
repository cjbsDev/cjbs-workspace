import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import Link from "next/link";
import { cjbsTheme } from "cjbsDSTM";
import { GET } from "api";
import axios from "axios";
import FileSaver from "file-saver";

const formatValue = (value) => (value === null ? "-" : value);

export const Columns = () => [
  {
    name: "No",
    width: "80px",
    // sortable: true,
    // center: true,
    selector: (row, index) => row.exptInfoFileDetailId,
  },
  {
    name: "파일명",
    // sortable: true,
    width: "250px",
    wrap: true,
    allowOverflow: true,
    selector: (row) => row.fileOriginNm,
  },
  {
    name: "다운로드",
    width: "90px",
    center: true,
    cell: (row) => {
      const { exptInfoFileDetailUkey, fileOriginNm } = row;

      const handleDownload = async (
        fileOriginNm: string,
        exptInfoFileDetailUkey: string,
      ) => {
        try {
          const res = await GET(`/expt/info/file/${exptInfoFileDetailUkey}`);

          await axios({
            url: res.data,
            method: "get",
            responseType: "blob",
          }).then((response) => {
            FileSaver.saveAs(response.data, fileOriginNm);
            console.log(">>>>>>>>>>", response);
          });
        } catch (e: any) {
          console.log(e.message);
        } finally {
        }
      };

      return (
        <IconButton
          size="small"
          onClick={() => handleDownload(fileOriginNm, exptInfoFileDetailUkey)}
        >
          <MyIcon icon="download" size={24} />
        </IconButton>
      );
    },
  },
  {
    name: "메모",
    width: "80px",
    center: true,
    selector: (row) => formatValue(row.fileMemo),
    cell: (row: { fileMemo: string }) => {
      const { fileMemo } = row;
      return (
        fileMemo !== null &&
        fileMemo !== "" && (
          <Tooltip title={fileMemo} arrow>
            <IconButton size="small">
              <MyIcon icon="memo" size={24} />
            </IconButton>
          </Tooltip>
        )
      );
    },
  },
  {
    name: "샘플개수",
    right: true,
    selector: (row) => formatValue(row.sampleCnt),
  },
  {
    name: "업로더",
    center: true,
    selector: (row) => row.userNm,
  },
  {
    name: "업로드 일자",
    width: "120px",
    right: true,
    selector: (row) => (row.createdDttm === null ? "-" : row.createdDttm),
  },
];
