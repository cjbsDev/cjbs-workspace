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
      color: "white",
      fontFamily: "NotoSansKR",
      fontWeight: "600",
      fontSize: 14,
      backgroundColor: cjbsTheme.palette.grey["800"],
      borderTop: "1px solid #000",
      borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      // paddingTop: 3,
      // paddingBottom: 3,
      minHeight: "36px",
    },
  },
  subHeader: {
    style: {
      backgroundColor: "white",
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  headCells: {
    style: {
      "&:hover .rdt_TableCol_Sortable > span": {
        opacity: 1, // 마우스 호버 상태와 관계없이 항상 표시
        fontSize: 10,
      },
      ".rdt_TableCol_Sortable > span": {
        opacity: 1, // 정렬 아이콘 항상 표시
        fontSize: 10,
      },
    },
    draggingStyle: {
      cursor: "move",
    },
  },
  headRow: {
    style: {
      // backgroundColor: cjbsTheme.palette.grey["50"],
      backgroundColor: cjbsTheme.palette.grey["800"],
      // minHeight: "40px",
      // borderTop: "1px solid #000",
      borderBottom: "none",
      "&:nth-of-type(1)": {
        paddingLeft: 0,
      },
      "&:nth-last-child(1)": {
        paddingRight: 0,
      },
    },
  },
  cells: {
    style: {
      fontFamily: "NotoSansKR",
      fontSize: 14,
      "&:nth-of-type(1)": {
        // paddingLeft: 0,
      },
      "&:nth-last-child(1)": {
        // paddingRight: 0,
      },
    },
  },
  rows: {
    style: {
      backgroundColor: "white",
      // paddingTop: 5,
      // paddingBottom: 5,
      // paddingLeft: 15,
      // paddingRight: 15,
    },
  },
  pagination: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      color: cjbsTheme.palette.common.black,
      // justifyContent: "flex-start",
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
      fontFamily: "NotoSansKR",
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
      fontFamily: "NotoSansKR",
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

export const dataTableCustomStyles3 = {
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
      color: "white",
      fontWeight: "600",
      fontSize: 14,
      fontFamily: "NotoSansKR",
      backgroundColor: cjbsTheme.palette.grey["50"],
      borderTop: "1px solid #000",
      borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      borderRight: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      // paddingTop: 3,
      // paddingBottom: 3,
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
      backgroundColor: cjbsTheme.palette.grey["800"],
      height: "36px",
      // borderTop: "1px solid #000",
      // borderRight: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      borderBottom: "none",
      // "&:nth-of-type(1)": {
      //   paddingLeft: 24,
      // },
      // "&:nth-last-child(1)": {
      //   paddingRight: 24,
      // },
    },
  },
  headCells: {
    style: {
      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      minHeight: 36,
    },
  },
  cells: {
    style: {
      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      // borderRight: "1px solid red",
      // minHeight: 50,
      fontFamily: "NotoSansKR",
      paddingTop: 5,
      paddingBottom: 5,
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
      // paddingTop: 7.5,
      // paddingBottom: 7.5,
      // paddingLeft: 24,
      // paddingRight: 24,
      borderRight: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      borderBottom: `1px solid ${cjbsTheme.palette.grey["400"]}`,
    },
    highlightOnHoverStyle: {
      backgroundColor: cjbsTheme.palette.grey["200"],
      borderBottomColor: `1px solid ${cjbsTheme.palette.grey["400"]}`,
    },
  },
  pagination: {
    style: {
      backgroundColor: cjbsTheme.palette.common.white,
      color: cjbsTheme.palette.common.black,
    },
  },
};
