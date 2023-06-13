"use client";

import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const MemberInformationView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [note, setNote] = useState("Lorem ipsum dolor sit amet.");
  const [country, setCountry] = useState("USA");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save the updated information, e.g., make an API request
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Member Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Note"
            multiline
            rows={4}
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
            margin="normal"
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" disabled={!isEditing}>
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {isEditing ? (
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      ) : (
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MemberInformationView;
