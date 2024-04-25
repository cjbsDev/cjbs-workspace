import React, { useState } from "react";
import { ContainedButton } from "cjbsDSTM";
import StockInModal from "./StockInModal";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

const Index = ({ rowData }) => {
  const router = useRouter();
  const currentPathname = usePathname();
  // console.log("IN", currentPathname);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { stockUkey, unpr } = rowData;

  const handleClose = () => {
    setIsOpen(false);
    router.push(currentPathname);
  };

  const handleOpen = () => {
    setIsOpen(true);
    router.push(`${currentPathname}?stockUkey=${stockUkey}`);
  };

  return (
    <>
      <ContainedButton buttonName="입고" onClick={handleOpen} size="small" />

      {isOpen && (
        <StockInModal
          onClose={handleClose}
          open={isOpen}
          modalWidth={500}
          unpr={unpr}
        />
      )}
    </>
  );
};

export default Index;
