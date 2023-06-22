/**
react mui material 로 이번에는 새로운 기능을 하는 페이지를 만들어봅시다.
페이지에는 data table과 맴버 관리 버튼이 있습니다.
페이지에 있는 data table 에 컬럼은 고객 이름, email, 거래처, 상태가 있습니다.
페이지에 있는  "맴버 관리" 버튼을 클릭하면 맴버 관리 모달이 뜨게해주세요.
모달은 제목이 맴버 관리
모달안에는 2개의 data table 이 있을 것입니다.
2개의 data table 은 각각 왼쪽, 오른쪽에 있습니다.
왼쪽 data table 에는 고객 리스트가 보여집니다.
고객 리스트가 나오는 왼쪽 data table 에는 선택할 수 있는 체크 박스, 고객 이름, email, 거래처, 상태의 속성을 가진 컬럼이 있고, 체크 박스를 선택해서 오른쪽 data table 에 추가 하는 기능을 가진 화살표 ">" 모양의 버튼 , 그 아래에는 "<" 버튼을 누르면 오른쪽 data table 에 선택한 열이 제거 되는 기능을 갖습니다.

오른쪽 data table 에는 체크박스, 고객이름, email, select box 로 구성되어있습니다.
그리고 모달에서는 "확인" 그리고 "닫기" 버튼이 있습니다. "확인" 버튼을 누르면 오른쪽 data table 에 있는 값들이 페이지에 있는 data table 에 적용됩니다.

거래처 관리 -> 거래처 등록

거래처(PI) 등록
  - 기관 검색
  - 우편번호 찾기
  - 맴버 관리

1. 기관 검색, 우편번호 찾기, 맴버 관리 버튼 생성
2. 각 모달 컴포넌트로 빼기
  - 기관 검색
  - 우편번호 찾기
  - 맴버 관리 ( memberMngtModal.tsx )

3. 다른 소스에서도 호출 할 수 있게 공통화 작업



 맴버 관리 하는 부분
 // 맴버 관리 모달 오픈

**/

"use client";
import React, { useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  LinkButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
  InputValidation,
  InputDefaultType,
  ModalContainer,
  ModalTitle,
} from "cjbsDSTM";
import {
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  TableContainer,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useDaumPostcodePopup } from "react-daum-postcode";
import AgncSearchModal from "./AgncSearchModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { memberManagementModalAtom } from "../../../../recoil/atoms/modalAtom";

const LazyMemberTable = dynamic(() => import("./MemberDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});

const LazyAgncSearchModal = dynamic(() => import("./AgncSearchModal"), {
  ssr: false,
});

const LazyMemberMngtModal = dynamic(() => import("./MemberMngtNewModal"), {
  ssr: false,
});

interface Customer {
  id: number;
  name: string;
  email: string;
  account: string;
  status: string;
}

const PageWithDataTable = () => {
  // State variables
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const [memberManagementModalOpen, setMemberManagementModalOpen] =
    useRecoilState(memberManagementModalAtom);
  const getMemberManagementModalOpen = useRecoilValue(
    memberManagementModalAtom
  );

  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log("Submit Click!!!!!");
    console.log("formData ==>> ", data);
  };

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handlePostAddressComplete = (data) => {
    console.log("Post code data ==>>", data);
    let fullAddress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log("fullAddress", fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    methods.setValue("zoneCode", zonecode);
    methods.setValue("agncAddress", fullAddress);
  };

  const handlePostAddressClick = () => {
    open({ onComplete: handlePostAddressComplete });
  };

  // Open the member management modal
  const handleMemberOpenModal = (): void => {
    // setShowModal(true);
    setMemberManagementModalOpen(true);
  };

  // 맴버 관리 모달 닫기
  // Close the member management modal
  const handleMemberCloseModal = (): void => {
    // setShowModal(false);
    setMemberManagementModalOpen(false);
  };

  // Handle customer selection in the left table
  const handleCustomerSelect = (customerId: number): void => {
    const isSelected = selectedCustomers.includes(customerId);

    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  // 선택된 항목 삭제
  // Handle removal of selected customers from the right table
  const handleRemoveSelected = (): void => {
    // Remove selected customers from the right table
    // You can implement this functionality based on your specific requirements
  };

  // Handle select all customers in the left table
  // const handleSelectAllCustomers = (): void => {
  //   const allCustomers = customerData.map((customer) => customer.id);
  //
  //   if (selectedCustomers.length === allCustomers.length) {
  //     setSelectedCustomers([]);
  //   } else {
  //     setSelectedCustomers(allCustomers);
  //   }
  // };

  // Handle adding selected customers to the right table
  const handleAddSelected = (): void => {
    // Add selected customers to the right table
    // You can implement this functionality based on your specific requirements
  };

  // Handle select all customers in the right table
  // const handleSelectAllSelected = (): void => {
  //   const allSelected = selectedData.map((customer) => customer.id);
  //
  //   if (selectedCustomers.length === allSelected.length) {
  //     setSelectedCustomers([]);
  //   } else {
  //     setSelectedCustomers(allSelected);
  //   }
  // };

  // Apply changes to the main data table on the page
  // const handleApplyChanges = (): void => {
  //   // Apply changes to the main data table on the page
  //   // You can implement this functionality based on your specific requirements
  //   console.log("Selected Customers:", selectedCustomers);
  //   console.log("Selected Status:", selectedStatus);
  //   handleCloseModal();
  // };

  // Sample customer data
  const customerData: Customer[] = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      account: "Account 1",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      account: "Account 2",
      status: "Inactive",
    },
    // Add more customer objects as needed
  ];

  // Sample selected data
  const selectedData: Customer[] = [
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      account: "Account 3",
      status: "Active",
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bobwilliams@example.com",
      account: "Account 4",
      status: "Inactive",
    },
    // Add more selected objects as needed
  ];

  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="거래처(PI) 등록" />
          </Box>

          {/*<Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>*/}
          {/*  <ContainedButton buttonName="맴버 관리" onClick={handleOpenModal} />*/}
          {/*</Stack>*/}

          <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>소속 기관</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        disabled={true}
                        error={
                          methods.formState.errors.belongAgnc ? true : false
                        }
                        helperText={
                          methods.formState.errors.belongAgnc
                            ? methods.formState.errors.belongAgnc?.message
                            : null
                        }
                        register={methods.register}
                        inputName="belongAgnc"
                        errorMessage="소속기관을 입력해 주세요."
                      />

                      <OutlinedButton
                        size="small"
                        buttonName="기관 검색"
                        onClick={agncSearchModalOpen}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        error={methods.formState.errors.agncPI ? true : false}
                        helperText={
                          methods.formState.errors.agncPI
                            ? methods.formState.errors.agncPI?.message
                            : null
                        }
                        register={methods.register}
                        inputName="agncPI"
                        errorMessage="거래처(PI)를 입력해 주세요."
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>주소 [선택]</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          register={methods.register}
                          inputName="zoneCode"
                          errorMessage={false}
                        />
                        <OutlinedButton
                          size="small"
                          buttonName="우편번호 찾기"
                          onClick={handlePostAddressClick}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          sx={{ width: 380 }}
                          register={methods.register}
                          inputName="agncAddress"
                          errorMessage={false}
                        />
                        <InputValidation
                          sx={{ width: 380 }}
                          register={methods.register}
                          inputName="agncAddressDetail"
                          errorMessage={false}
                        />
                      </Stack>
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <ErrorContainer FallbackComponent={Fallback}>
            <LazyMemberTable />
          </ErrorContainer>

          <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
            운영 관리 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>상태</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <FormControlLabel
                      label="특별 관리(SP)하는 거래처 입니다"
                      control={
                        <Checkbox
                          size="small"
                          {...methods.register("statussss")}
                        />
                      }
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>영업 담당자</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Select
                      {...methods.register("sales")}
                      size="small"
                      sx={{ width: 200 }}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>메모</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={4}
                      register={methods.register}
                      inputName="agncMemo"
                      errorMessage={false}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* 기관 검색 모달 */}
          {showAgncSearchModal && (
            <LazyAgncSearchModal
              onClose={agncSearchModalClose}
              open={showAgncSearchModal}
              modalWidth={800}
            />
          )}

          {/* 멤버 관리 모달 */}
          {getMemberManagementModalOpen && (
            <LazyMemberMngtModal
              onClose={handleMemberCloseModal}
              open={getMemberManagementModalOpen}
              modalWidth={1006}
            />
          )}

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("cust-list")}
            />
            <ContainedButton type="submit" buttonName="저장" />
          </Stack>
        </Box>

        {/* Member Management Modal */}
        {/*<Dialog*/}
        {/*  open={getMemberManagementModalOpen}*/}
        {/*  onClose={handleMemberCloseModal}*/}
        {/*  maxWidth="lg"*/}
        {/*>*/}
        {/*  <DialogTitle>고객 검색</DialogTitle>*/}
        {/*  <DialogContent>*/}
        {/*    <div style={{ display: "flex", justifyContent: "space-between" }}>*/}
        {/*      /!* Left Table - Customer List *!/*/}
        {/*      <Table>*/}
        {/*        <TableHead>*/}
        {/*          <TableRow>*/}
        {/*            <TableCell padding="checkbox">*/}
        {/*              <Checkbox*/}
        {/*                checked={*/}
        {/*                  selectedCustomers.length === customerData.length*/}
        {/*                }*/}
        {/*                onChange={handleSelectAllCustomers}*/}
        {/*              />*/}
        {/*            </TableCell>*/}
        {/*            <TableCell>고객</TableCell>*/}
        {/*            <TableCell>이메일</TableCell>*/}
        {/*            <TableCell>거래처(PI)</TableCell>*/}
        {/*            <TableCell>상태</TableCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHead>*/}
        {/*        <TableBody>*/}
        {/*          {customerData.map((customer) => (*/}
        {/*            <TableRow key={customer.id}>*/}
        {/*              <TableCell padding="checkbox">*/}
        {/*                <Checkbox*/}
        {/*                  checked={selectedCustomers.includes(customer.id)}*/}
        {/*                  onChange={() => handleCustomerSelect(customer.id)}*/}
        {/*                />*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>{customer.name}</TableCell>*/}
        {/*              <TableCell>{customer.email}</TableCell>*/}
        {/*              <TableCell>{customer.account}</TableCell>*/}
        {/*              <TableCell>{customer.status}</TableCell>*/}
        {/*            </TableRow>*/}
        {/*          ))}*/}
        {/*        </TableBody>*/}
        {/*      </Table>*/}

        {/*      /!* Buttons for moving customers *!/*/}
        {/*      <div*/}
        {/*        style={{*/}
        {/*          display: "flex",*/}
        {/*          flexDirection: "column",*/}
        {/*          alignItems: "center",*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <IconButton*/}
        {/*          onClick={handleRemoveSelected}*/}
        {/*          disabled={selectedCustomers.length === 0}*/}
        {/*        >*/}
        {/*          <ArrowLeft />*/}
        {/*        </IconButton>*/}
        {/*        <IconButton*/}
        {/*          onClick={handleAddSelected}*/}
        {/*          disabled={selectedCustomers.length === 0}*/}
        {/*        >*/}
        {/*          <ArrowRight />*/}
        {/*        </IconButton>*/}
        {/*      </div>*/}

        {/*      /!* Right Table - Selected Customers *!/*/}
        {/*      <Table>*/}
        {/*        <TableHead>*/}
        {/*          <TableRow>*/}
        {/*            <TableCell padding="checkbox">*/}
        {/*              <Checkbox*/}
        {/*                checked={*/}
        {/*                  selectedCustomers.length === selectedData.length*/}
        {/*                }*/}
        {/*                onChange={handleSelectAllSelected}*/}
        {/*              />*/}
        {/*            </TableCell>*/}
        {/*            <TableCell>고객</TableCell>*/}
        {/*            <TableCell>이메일</TableCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHead>*/}
        {/*        <TableBody>*/}
        {/*          {selectedData.map((customer) => (*/}
        {/*            <TableRow key={customer.id}>*/}
        {/*              <TableCell padding="checkbox">*/}
        {/*                <Checkbox*/}
        {/*                  checked={selectedCustomers.includes(customer.id)}*/}
        {/*                  onChange={() => handleCustomerSelect(customer.id)}*/}
        {/*                />*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>{customer.name}</TableCell>*/}
        {/*              <TableCell>{customer.email}</TableCell>*/}
        {/*            </TableRow>*/}
        {/*          ))}*/}
        {/*        </TableBody>*/}
        {/*      </Table>*/}
        {/*    </div>*/}
        {/*  </DialogContent>*/}
        {/*  <DialogActions>*/}
        {/*    <Grid container spacing={2} justifyContent="center">*/}
        {/*      <Grid item>*/}
        {/*        <Button*/}
        {/*          variant="contained"*/}
        {/*          color="primary"*/}
        {/*          onClick={handleApplyChanges}*/}
        {/*        >*/}
        {/*          Check*/}
        {/*        </Button>*/}
        {/*      </Grid>*/}
        {/*      <Grid item>*/}
        {/*        <Button variant="contained" onClick={handleMemberCloseModal}>*/}
        {/*          Close*/}
        {/*        </Button>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </DialogActions>*/}
        {/*</Dialog>*/}
      </Container>
    </FormProvider>
  );
};

export default PageWithDataTable;
