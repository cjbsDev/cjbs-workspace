"use client"

import React from 'react';
import useSWR from 'swr';
import {DataTableBase} from "ui/Organism";
import axios from 'axios'
// const fetcher = url => axios.get(url).then(res => res.data)
const fetcher = url => fetch(url).then(r => r.json())
const DataList = () => {
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    // {
    //   name: 'Year',
    //   selector: row => row.year,
    // },
  ];
  const { data, error, isLoading } = useSWR('https://dummyjson.com/products', fetcher, {suspense: true})
  // if (error) return <div>failed to load</div>
  // if (isLoading) return <SkeletonLoading />

  return (
    <DataTableBase data={data.products} columns={columns} />
  );
};

export default DataList;
