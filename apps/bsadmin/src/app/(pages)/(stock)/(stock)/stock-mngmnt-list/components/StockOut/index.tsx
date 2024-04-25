import React, { useState } from "react";
import { ContainedButton } from "cjbsDSTM";
import StockOutModal from "./StockOutModal";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

const Index = ({ rowData }) => {
  const router = useRouter();
  const currentPathname = usePathname();
  // console.log("OUT", currentPathname);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { stockUkey, isGutInside } = rowData;

  const handleClose = () => {
    setIsOpen(false);
    router.push(currentPathname);
  };

  const handleOpen = () => {
    setIsOpen(true);
    router.push(
      `${currentPathname}?stockUkey=${stockUkey}&isGutInside=${isGutInside}`,
    );
  };

  return (
    <>
      <ContainedButton
        buttonName="출고"
        color="warning"
        onClick={handleOpen}
        size="small"
      />
      {isOpen && (
        <StockOutModal onClose={handleClose} open={isOpen} modalWidth={500} />
      )}
    </>
  );
};

export default Index;
