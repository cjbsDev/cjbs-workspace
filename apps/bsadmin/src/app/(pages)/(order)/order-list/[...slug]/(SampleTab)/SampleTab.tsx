import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import SubHeader from "./SubHeader";

const LazySampleInfoModal = dynamic(
  () => import("./(SampleInfoModal)/SampleInfoModal"),
  {
    ssr: false,
  },
);
const LazySampleAddModal = dynamic(
  () => import("./(SampleAddModal)/SampleAddModal"),
  {
    ssr: false,
  },
);

const LazyAnalDtlModal = dynamic(
  () => import("./(AnalDtlModal)/AnalDtlModal"),
  {
    ssr: false,
  },
);

const LazyExperimentProgressChangeModal = dynamic(
  () =>
    import("./(ExperimentProgressChangeModal)/ExperimentProgressChangeModal"),
  {
    ssr: false,
  },
);
const LazySampleBatchChangeModal = dynamic(
  () => import("./(SampleBatchChangeModal)/SampleBatchChangeModal"),
  {
    ssr: false,
  },
);

const LazySampleDataTable = dynamic(() => import("./SampleDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const SampleTab = () => {
  const [filterText, setFilterText] = useState<string>("");
  const [isClear, setIsClear] = useState<boolean>(false);
  const [sampleUkeyList, setSampleUkeyList] = useState<string[]>([]);
  const [sampleIdList, setSampleIdList] = useState<number[]>([]);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  useEffect(() => {
    // isClear 상태 변경 이슈
    setIsClear(false);
  }, [isClear]);

  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/${orderUkey}/sample/list`, fetcher, {
    suspense: true,
  });
  const sampleList = Array.from(data);

  // [샘플 정보] 모달
  const [showSampleInfoModal, setShowSampleInfoModal] = useState({
    isShow: false,
    sampleUkey: "",
  });
  // [샘플 추가] 모달
  const [showSampleAddModal, setShowSampleAddModal] = useState(false);
  // [분석 내역 보기] 모달
  const [showAnalDtlModal, setShowAnalDtlModal] = useState(false);
  // [샘플 정보 일괄 변경] 모달
  const [showSampleBatchChangeModal, setShowSampleBatchChangeModal] =
    useState(false);
  // [실험 진행 단계 변경] 모달
  const [showExPrgsChngModal, setShowExPrgsChngModal] = useState(false);

  const filteredItems = sampleList.filter((item) => {
    const filterPattern = new RegExp(
      filterText.toLowerCase().normalize("NFC"),
      "i",
    );

    return (
      (item.sampleId && filterPattern.test(item.sampleId)) ||
      (item.sampleNm &&
        filterPattern.test(item.sampleNm.toLowerCase().normalize("NFC"))) ||
      (item.sampleTypeVal &&
        filterPattern.test(
          item.sampleTypeVal.toLowerCase().normalize("NFC"),
        )) ||
      (item.source &&
        filterPattern.test(item.source.toLowerCase().normalize("NFC"))) ||
      (item.depthVal &&
        filterPattern.test(item.depthVal.toLowerCase().normalize("NFC"))) ||
      (item.taxonVal &&
        filterPattern.test(item.taxonVal.toLowerCase().normalize("NFC"))) ||
      (item.runList.join() &&
        filterPattern.test(
          item.runList.join().toLowerCase().normalize("NFC"),
        )) ||
      (item.sampleStatusRes.rcptStatusVal &&
        filterPattern.test(
          item.sampleStatusRes.rcptStatusVal.toLowerCase().normalize("NFC"),
        )) ||
      (item.isAnlsItst &&
        filterPattern.test(item.isAnlsItst.toLowerCase().normalize("NFC")))
    );
  });

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const onFilter = (e: { target: { value: React.SetStateAction<string> } }) =>
      setFilterText(e.target.value);
    const handleSampleAddModalOpen = () => {
      setShowSampleAddModal(true);
    };

    const handleAnalDtlModalOpen = () => {
      console.log("sampleUkeyList.length1", sampleUkeyList.length);
      if (sampleUkeyList.length !== 0) setShowAnalDtlModal(true);
      if (sampleUkeyList.length === 0) toast("샘플을 선택해 주세요.");
      // setIsClear(false);
    };
    const handleExPrgrsPhsOpen = () => {
      console.log("sampleUkeyList.length2", sampleUkeyList.length);
      if (sampleUkeyList.length !== 0) setShowExPrgsChngModal(true);
      if (sampleUkeyList.length === 0) toast("샘플을 선택해 주세요.");
      // setIsClear(false);
    };

    const handleSampleBatchModalOpen = () => {
      console.log("sampleUkeyList.length3", sampleUkeyList.length);
      if (sampleUkeyList.length !== 0) setShowSampleBatchChangeModal(true);
      if (sampleUkeyList.length === 0) toast("샘플을 선택해 주세요.");
      // setIsClear(false);
    };

    return (
      <SubHeader
        exportUrl={`/order/${orderUkey}/sample/list/download`}
        totalCount={filteredItems.length}
        handleSampleAddModalOpen={handleSampleAddModalOpen}
        handleAnalDtlModalOpen={handleAnalDtlModalOpen}
        handleSampleBatchModalOpen={handleSampleBatchModalOpen}
        handleExPrgrsPhsOpen={handleExPrgrsPhsOpen}
        handleClear={handleClear}
        filterText={filterText}
        onFilter={onFilter}
      />
    );
  }, [
    filterText,
    resetPaginationToggle,
    sampleUkeyList,
    filteredItems.length,
    isClear,
    showAnalDtlModal,
    showExPrgsChngModal,
    showSampleBatchChangeModal,
  ]);

  const goDetailModal = useCallback(
    (row: any) => {
      const sampleUkey = row.sampleUkey;
      setShowSampleInfoModal({
        ...showSampleInfoModal,
        sampleUkey: sampleUkey,
        isShow: true,
      });
    },
    [showSampleInfoModal],
  );

  const handleSelectedRowChange = useCallback(
    ({ selectedRows }: any) => {
      const getSampleUkeyList = selectedRows.map((row) => row.sampleUkey);
      const getSampleIDList = selectedRows.map((row) => row.sampleId);
      console.log("selectedSampleUkeyList ==>>", getSampleUkeyList);
      // console.log("selectedSampleIdList ==>>", getSampleIDList);
      setSampleUkeyList(getSampleUkeyList);
      setSampleIdList(getSampleIDList);
    },
    [sampleUkeyList],
  );

  const handleSampleInfoModalClose = () => {
    setShowSampleInfoModal({
      ...showSampleInfoModal,
      isShow: false,
    });
  };

  const handleSampleAddModalClose = () => {
    setShowSampleAddModal(false);
  };

  const handleAnalDtlModalClose = () => {
    setShowAnalDtlModal(false);
    // setSampleUkeyList([]);
    // setIsClear(true);
  };

  const handleExPrgsChngModalClose = (success?: boolean) => {
    setShowExPrgsChngModal(false);
    if (success) {
      setSampleUkeyList([]);
      setIsClear(true);
    }
  };

  const handleSampleBatchChangeModalClose = (success?: boolean) => {
    setShowSampleBatchChangeModal(false);
    if (success) {
      setSampleUkeyList([]);
      setSampleIdList([]);
      setIsClear(true);
    }
  };

  // const handleSampleBatchChangeSubmitModalClose = () => {
  //   setShowSampleBatchChangeModal(false);
  //   setSampleUkeyList([]);
  //   setSampleIdList([]);
  //   setIsClear(true);
  // };

  return (
    <>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazySampleDataTable
          subHeaderComponentMemo={subHeaderComponentMemo}
          handleSelectedRowChange={handleSelectedRowChange}
          goDetailModal={goDetailModal}
          filterText={filterText}
          isClear={isClear}
        />
      </ErrorContainer>

      {/* 샘플Info 모달 */}
      {showSampleInfoModal.isShow && (
        <LazySampleInfoModal
          onClose={handleSampleInfoModalClose}
          open={showSampleInfoModal.isShow}
          sampleUkey={showSampleInfoModal.sampleUkey}
          modalWidth={800}
        />
      )}

      {/* 샘플Add 모달 */}
      {showSampleAddModal && (
        <LazySampleAddModal
          onClose={handleSampleAddModalClose}
          open={showSampleAddModal}
          modalWidth={800}
        />
      )}

      {/* 분석 내역 보기 모달 */}
      {showAnalDtlModal && (
        <LazyAnalDtlModal
          onClose={handleAnalDtlModalClose}
          open={showAnalDtlModal}
          modalWidth={1100}
          sampleUkeyList={sampleUkeyList}
        />
      )}

      {/* 샘플 정보 일괄 변경 */}
      {showSampleBatchChangeModal && (
        <LazySampleBatchChangeModal
          onClose={handleSampleBatchChangeModalClose}
          // onSubmitClose={handleSampleBatchChangeSubmitModalClose}
          open={showSampleBatchChangeModal}
          modalWidth={800}
          sampleIdList={sampleIdList}
          sampleUkeyList={sampleUkeyList}
        />
      )}

      {/* 실험 진행 단계 변경 */}
      {showExPrgsChngModal && (
        <LazyExperimentProgressChangeModal
          onClose={handleExPrgsChngModalClose}
          open={showExPrgsChngModal}
          modalWidth={450}
          sampleUkeyList={sampleUkeyList}
        />
      )}
    </>
  );
};

export default SampleTab;
