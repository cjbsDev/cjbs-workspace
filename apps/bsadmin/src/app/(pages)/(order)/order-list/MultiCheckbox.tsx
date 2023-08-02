import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";
import { ThemeProvider } from "@mui/material/styles";

export const MultiCheckbox = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
    // Add more checkboxes as needed
  ]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (checkboxId) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === checkboxId
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <ThemeProvider theme={cjbsTheme}>
      <Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="subTitle1" sx={{ mr: 1 }}>
            Filter
          </Typography>
          {checkboxes.map((checkbox) => (
            <FormControlLabel
              key={checkbox.id}
              control={
                <Checkbox
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
              }
              label={checkbox.label}
            />
          ))}
        </Box>

        <p>{JSON.stringify(checkboxes)}</p>
      </Box>
    </ThemeProvider>
  );
};
