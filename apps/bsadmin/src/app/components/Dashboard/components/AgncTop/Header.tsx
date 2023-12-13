import React from "react";
import SectionHeader from "../SectionHeader";

const Header = () => {
  return (
    <SectionHeader>
      <SectionHeader.Title>매출 TOP 거래처</SectionHeader.Title>
      <SectionHeader.MoreBtn
        buttonName="more"
        onClick={() => console.log("거래처 더보기")}
        disabled={true}
      />
    </SectionHeader>
  );
};

export default Header;
