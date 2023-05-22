import { Autocomplete, Box, SxProps } from '@mui/material';
import React from 'react';

interface BasicAutocompleateProps {
  sx?: SxProps;
  data?: object[];
  placeholder?: string;
}

const BasicAutocompleate = ({
  sx,
  data,
  placeholder,
}: BasicAutocompleateProps) => {
  return (
    <Box sx={sx}>
      {/* <Autocomplete
        disablePortal
        // filterOptions={filterOptions}
         options={data}
        placeholder={placeholder}
        // value={searchWord}
        sx={sx}
        // onChange={(e, value) =>
        //   onChange(value && value.label ? value.label : '')
        // }
        renderInput={(params) => (
        //   <TextField
        //     {...params}
        //     placeholder={label}
        //     // value={searchWord}
        //     onChange={(e) => onChange(e.target.value)}
        //     error={error}
        //     helperText={helperText}
        //     // variant="outlined"
        //     // size="medium"
        //     // InputProps={{
        //     //   style:{
        //     //     'border': error ? '1px solid red' : '',
        //     //   }
        //     // }}
        //   />
        )}
      /> */}
    </Box>
  );
};

export default BasicAutocompleate;
