import {grey} from '@mui/material/colors'

export const dataTableCustomStyles = {
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
      fontSize: 14,
      backgroundColor: grey[800],
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
      minHeight: '40px',
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
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  pagination: {
    style: {
      backgroundColor: grey[50],
      color: 'black',
    },
  },
};
