import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
export const dataTableEzcxCustomStyles = {
  header: {
    style: {
      backgroundColor: 'white',
      padding: 0,
    },
  },
  head: {
    style: {
      color: 'black',
      fontWeight: '600',
      height: '40px',
      fontSize: 14,
      backgroundColor: grey.A100,
    },
  },
  subHeader: {
    style: {
      backgroundColor: 'white',
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  headRow: {
    style: {
      backgroundColor: grey.A100,
      minHeight: '50px',
      borderTop: '1px solid #000',
      '&:nth-of-type(1)': {
        paddingLeft: 24,
      },
      '&:nth-last-child(1)': {
        paddingRight: 24,
      },
      // paddingLeft: 24,
      // paddingRight: 24,
    },
  },
  cells: {
    style: {
      fontSize: 14,
      '&:nth-of-type(1)': {
        // paddingLeft: 40,
      },
      '&:nth-last-child(1)': {
        // paddingRight: 40,
      },
    },
  },
  rows: {
    style: {
      cursor: 'default !important',
      minHeight: '35px',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 24,
      paddingRight: 24,
      borderBottom: '1px solid lightgray',
    },
  },
  pagination: {
    style: {
      backgroundColor: grey[50],
      color: 'black',
    },
  },
};