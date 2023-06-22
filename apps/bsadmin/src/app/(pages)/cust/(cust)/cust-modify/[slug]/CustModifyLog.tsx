"use client";

import React, { useState, useEffect } from "react";
import { DataTableBase } from "cjbsDSTM";
import { TableColumn } from "react-data-table-component";
import { Box, Stack } from "@mui/material";

import useSWR from "swr";
import axios from "axios";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface CustModifyLogProps {
  slug: string;
  ebcShow: boolean;
}

const CustModifyLog: React.FC<CustModifyLogProps> = ({ slug }) => {
  /*
  // 새로 추가 시작
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (page: number, search: string) => {
    setLoading(true);

    try {
      const response = await fetch(`http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list?page=${page}&size=50`);
      const json = await response.json();

      // Update the data and totalRows state variables
      setData(json.data);
      setTotalRows(json.totalRows);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when performing a new search
  };

  // 새로 추가 종료
*/

  const { data: custModifyLogTemp, error: custModifyLogError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}/hstr?page=0&size=50`,
    fetcher
  );

  if (!custModifyLogTemp) {
    return <div>Cust Modify log Loading...</div>;
  }

  const custModifyLogList = custModifyLogTemp.data.hstrList;

  const columns = [
    {
      name: "변경일",
      selector: (row: { modifiedAt: any }) => row.modifiedAt,
      width: "20%",
    },
    {
      name: "변경자",
      cell: (row: { updatedByNm: any; updatedByEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={0.4}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.updatedByNm}</Box>
            <Box>( {row.updatedByEmail} )</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
      width: "20%",
    },

    {
      name: "컬럼",
      selector: (row: { targetColNm: any }) => row.targetColNm,
      width: "20%",
    },
    {
      name: "변경 전",
      selector: (row: { preUpdateValue: any }) => row.preUpdateValue,
      width: "20%",
    },
    {
      name: "변경 후",
      selector: (row: { postUpdateValue: any }) => row.postUpdateValue,
      width: "20%",
    },
  ];
  return (
    <DataTableBase
      data={custModifyLogList}
      columns={columns}
      selectableRows={false}
      paginationPerPage={50}
      paginationRowsPerPageOptions={[20, 50, 100]}
      customStyles={dataTableCustomStyles2}
      //progressPending={loading}
      //onChangePage={handlePageChange}
    />
  );
};

export default CustModifyLog;
