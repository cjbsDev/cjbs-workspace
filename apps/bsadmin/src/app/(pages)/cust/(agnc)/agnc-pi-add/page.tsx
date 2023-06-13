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

import {
  ContainedButton,
  OutlinedButton,
  LinkButton,
  Title1,
  TH,
  TD,
} from "cjbsDSTM";

import React, { useState } from "react";
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
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

interface Customer {
  id: number;
  name: string;
  email: string;
  account: string;
  status: string;
}

const PageWithDataTable = () => {
  // State variables
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Open the member management modal
  const handleOpenModal = (): void => {
    setShowModal(true);
  };

  // 맴버 관리 모달 닫기
  // Close the member management modal
  const handleCloseModal = (): void => {
    setShowModal(false);
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
  const handleSelectAllCustomers = (): void => {
    const allCustomers = customerData.map((customer) => customer.id);

    if (selectedCustomers.length === allCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(allCustomers);
    }
  };

  // Handle adding selected customers to the right table
  const handleAddSelected = (): void => {
    // Add selected customers to the right table
    // You can implement this functionality based on your specific requirements
  };

  // Handle select all customers in the right table
  const handleSelectAllSelected = (): void => {
    const allSelected = selectedData.map((customer) => customer.id);

    if (selectedCustomers.length === allSelected.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(allSelected);
    }
  };

  // Apply changes to the main data table on the page
  const handleApplyChanges = (): void => {
    // Apply changes to the main data table on the page
    // You can implement this functionality based on your specific requirements
    console.log("Selected Customers:", selectedCustomers);
    console.log("Selected Status:", selectedStatus);
    handleCloseModal();
  };

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

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="거래처(PI) 등록" />
      </Box>

      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
        <ContainedButton buttonName="맴버 관리" onClick={handleOpenModal} />
      </Stack>

      {/* Member Management Modal */}
      <Dialog open={showModal} onClose={handleCloseModal} maxWidth="lg">
        <DialogTitle>고객 검색</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Table - Customer List */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomers.length === customerData.length}
                      onChange={handleSelectAllCustomers}
                    />
                  </TableCell>
                  <TableCell>고객</TableCell>
                  <TableCell>이메일</TableCell>
                  <TableCell>거래처(PI)</TableCell>
                  <TableCell>상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleCustomerSelect(customer.id)}
                      />
                    </TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.account}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Buttons for moving customers */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleRemoveSelected}
                disabled={selectedCustomers.length === 0}
              >
                <ArrowLeft />
              </IconButton>
              <IconButton
                onClick={handleAddSelected}
                disabled={selectedCustomers.length === 0}
              >
                <ArrowRight />
              </IconButton>
            </div>

            {/* Right Table - Selected Customers */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomers.length === selectedData.length}
                      onChange={handleSelectAllSelected}
                    />
                  </TableCell>
                  <TableCell>고객</TableCell>
                  <TableCell>이메일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleCustomerSelect(customer.id)}
                      />
                    </TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyChanges}
              >
                Check
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleCloseModal}>
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PageWithDataTable;
