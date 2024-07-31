import React from "react";
import MyIcon from "icon/MyIcon";
import InputAdornment from "@mui/material/InputAdornment";

interface TaxonProps {
  iconName: string;
}
export const Taxon = (props: TaxonProps) => {
  const { iconName } = props;
  return (
    <InputAdornment position="start" sx={{}}>
      <MyIcon icon={iconName} size={20} />
    </InputAdornment>
  );
};
