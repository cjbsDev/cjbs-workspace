import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

interface Customer {
  id: number;
  name: string;
  email: string;
  account: string;
  status: string;
}

interface MemberManagementModalProps {
  open: boolean;
  onClose: () => void;
}

const MemberManagementModal: React.FC<MemberManagementModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleCustomerSelect = (customerId: number): void => {
    const isSelected = selectedCustomers.includes(customerId);

    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleRemoveSelected = (): void => {
    // Remove selected customers from the right table
    // You can implement this functionality based on your specific requirements
  };

  const handleSelectAllCustomers = (): void => {
    // Select all customers in the left table
    // You can implement this functionality based on your specific requirements
  };

  const handleAddSelected = (): void => {
    // Add selected customers to the right table
    // You can implement this functionality based on your specific requirements
  };

  const handleSelectAllSelected = (): void => {
    // Select all customers in the right table
    // You can implement this functionality based on your specific requirements
  };

  const handleApplyChanges = (): void => {
    // Apply changes to the main data table on the page
    // You can implement this functionality based on your specific requirements
    console.log("Selected Customers:", selectedCustomers);
    console.log("Selected Status:", selectedStatus);
    onClose();
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
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Member Management</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2}>
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
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Status</TableCell>
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
          <Stack direction="column" justifyContent="center">
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
          </Stack>

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
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyChanges}
          >
            Check
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default MemberManagementModal;
