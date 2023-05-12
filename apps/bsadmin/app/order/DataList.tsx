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
  const { data } = useSWR('https://dummyjson.com/products', fetcher, {suspense: true})

  return (
    <DataTableBase data={data.products} columns={columns} />
  );
};

export default DataList;
