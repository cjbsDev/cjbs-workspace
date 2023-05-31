import React from 'react';
import { Autocomplete } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from 'api';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';

const DashboardSearchInput = () => {
  const { data, isLoading } = useSWR('/filter/autocomplete', fetcher);

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return;
    }

    console.log('data!!!> ', data);

    return (
      <></>
      // <Autocomplete
      //   disablePortal
      //   filterOptions={filterOptions}
      //   options={autocompleteData}
      //   placeholder={label}
      //   loading={loading}
      //   value={searchWord}
      //   sx={sx}
      //   onChange={(e, value) => onChange(value && value.label ? value.label : '')}
      //   renderInput={(params) => (
      //     <TextField
      //       {...params}
      //       placeholder={label}
      //       onChange={(e) => onChange(e.target.value)}
      //       error={error}
      //       helperText={helperText}
      //     />
      //   )}
      // />
    );
  }
};

export default DashboardSearchInput;
