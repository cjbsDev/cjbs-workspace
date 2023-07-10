import { cjbsTheme } from "../../../themes";
export const dataTableCustomStyles = {
  table: {
    style: {
      // color: theme.text.primary,
      backgroundColor: cjbsTheme.palette.common.white,
    },
  },
  header: {
    style: {
      backgroundColor: "white",
      padding: 0,
    },
  },
  head: {
    style: {
      color: "black",
      fontWeight: "600",
      fontSize: 14,
      backgroundColor: cjbsTheme.palette.grey["50"],
      borderTop: "1px solid #000",
      borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
  subHeader: {
    style: {
      backgroundColor: "white",
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  headRow: {
    style: {
      backgroundColor: cjbsTheme.palette.grey["50"],
      // minHeight: "40px",
      // borderTop: "1px solid #000",
      borderBottom: "none",
      "&:nth-of-type(1)": {
        paddingLeft: 24,
      },
      "&:nth-last-child(1)": {
        paddingRight: 24,
      },
    },
  },
  cells: {
    style: {
      fontSize: 14,
      "&:nth-of-type(1)": {
        // paddingLeft: 40,
      },
      "&:nth-last-child(1)": {
        // paddingRight: 40,
      },
    },
  },
  rows: {
    style: {
      backgroundColor: "white",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  pagination: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      color: cjbsTheme.palette.common.black,
    },
  },
};

export const dataTableCustomStyles2 = {
  table: {
    style: {
      // color: theme.text.primary,
      backgroundColor: cjbsTheme.palette.common.white,
    },
  },
  tableWrapper: {
    style: {
      display: "table",
      borderCollapse: "collapse",
    },
  },
  header: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      padding: 0,
    },
  },
  head: {
    style: {
      color: cjbsTheme.palette.common.black,
      fontWeight: "600",
      fontSize: 14,
      backgroundColor: cjbsTheme.palette.grey["100"],
      borderCollapse: "collapse",
    },
  },
  subHeader: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  headRow: {
    style: {
      backgroundColor: cjbsTheme.palette.grey["100"],
      // minHeight: "40px",
      borderTop: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      "&:nth-of-type(1)": {
        paddingLeft: 0,
      },
      "&:nth-last-child(1)": {
        paddingRight: 0,
      },
      paddingLeft: 0,
      paddingRight: 0,
    },
    denseStyle: {
      minHeight: "40px",
    },
  },
  headCells: {
    style: {
      borderRight: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      // paddingLeft: "16px",
      // paddingRight: "16px",
    },
    draggingStyle: {
      cursor: "move",
    },
  },
  cells: {
    style: {
      fontSize: 14,
      borderRight: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      "&:nth-of-type(1)": {
        // paddingLeft: 40,
      },
      "&:nth-last-child(1)": {
        // paddingRight: 40,
      },
    },
  },
  rows: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
    },
  },
  pagination: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      color: cjbsTheme.palette.common.black,
    },
  },
};
