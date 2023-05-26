import * as React from 'react';
import useSWR from 'swr';
import {DataTableBase, DataTableFilter, Title1} from "@components/index";
import {Box, Stack} from '@mui/material';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import {useState} from "react";
import {ExcelDownloadButton} from "@components/molecules/ExcelDownloadButton";
const fetcher = url => axios.get(url).then(res => res.data)
// const fetcher = url => fetch(url).then(r => r.json())
const DataList = () => {
  const router = useRouter();
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Brand',
      selector: row => row.brand,
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'Rating',
      selector: row => row.rating,
    },
    {
      name: 'Stock',
      selector: row => row.stock,
    },
  ];
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data } = useSWR('https://dummyjson.com/products', fetcher, {suspense: true})

  const filteredData = data.products.filter(
      item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
  );

  console.log('filteredData ==>>',filteredData)

  const goDetailPage = (row) => {
    const path = row.title
    router.push('/dashboard/order/' + path.toString())
  }

  const subHeaderComponentMemo = React.useMemo(() => {
    		const handleClear = () => {
      			if (filterText) {
        				setResetPaginationToggle(!resetPaginationToggle);
       				setFilterText('');
        			}
      		};

    		return (
          <Stack direction='row' spacing={1} sx={{mb: 1.5}}>
            <ExcelDownloadButton labelName='Excel' onClick={() => console.log('Excel!!!!')} />
      			<DataTableFilter onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
          </Stack>
    		);
    }, [filterText, resetPaginationToggle]);

  return (
    <DataTableBase
      title={<Title1 titleName='오더' />}
      data={filteredData}
      columns={columns}
      onRowClicked={goDetailPage}
      pointerOnHover
      highlightOnHover
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
    />
  );
};

export default DataList;
