import React, { useState } from "react";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";
import FileUploadModal from "./FileUploadModal";
import { RecoilRoot, useRecoilState } from "recoil";
import { fileModalAtom } from "./fileModalAtom";

const LazyFileTable = dynamic(() => import("./FileTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={300} />,
});

const FileTab = () => {
  // const [isFileUploadModal, setIsFileUploadModal] = useState<boolean>(false);
  const [isFileUploadModal, setIsFileUploadModal] =
    useRecoilState(fileModalAtom);
  // const setIsFileUploadModal = useSetRecoilState(fileModalAtom);

  const handleFileUploadModalClose = () => {
    setIsFileUploadModal(false);
  };

  return (
    <RecoilRoot override={false}>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyFileTable />
      </ErrorContainer>

      {/* 실험 진행 단계 변경 */}
      {isFileUploadModal && (
        <FileUploadModal
          onClose={handleFileUploadModalClose}
          open={isFileUploadModal}
          modalWidth={1100}
          formId="fileUploadForm"
        />
      )}
    </RecoilRoot>
  );
};

export default FileTab;
