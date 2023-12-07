"use client";
import useSWR from "swr";
import { fetcherOrsh } from 'api';

export const useList = (
  page: number = 1,
  perPage: number = 20
) => {
  const { data } = useSWR(
    `/list?page=${page}&size=${perPage}`,
    fetcherOrsh,
    {
      suspense: true,
      retry: 1,
    }
  );

  return {
    data: data,
  };
};
