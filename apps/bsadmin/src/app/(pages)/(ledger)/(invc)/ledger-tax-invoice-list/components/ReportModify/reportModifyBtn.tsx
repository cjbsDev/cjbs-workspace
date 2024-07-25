import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { reportModifyAtom } from "../../atom";

const ReportModifyBtn = ({ report, invcUkey }) => {
  const setReportModifyIs = useSetRecoilState(reportModifyAtom);

  const handleReportModifyModal = () => {
    console.log("invcUkey ==>>", report, invcUkey);
    setReportModifyIs((prevState) => ({
      ...prevState,
      isOpen: true,
      report: report,
      invcUkey: invcUkey,
    }));
  };

  return (
    <IconButton onClick={handleReportModifyModal}>
      <MyIcon icon="pencil-alt" size={18} />
    </IconButton>
  );
};

export default ReportModifyBtn;
