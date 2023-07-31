import { Box, Stack, styled, Typography } from "@mui/material";
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import React from "react";

const blueColorLists = Object.values(blue);
const yellowColorLists = Object.values(yellow);
const redColorLists = Object.values(red);
const orangeColorLists = Object.values(orange);
const cyanColorLists = Object.values(cyan);
const greyColorLists = Object.values(grey);
const greenColorLists = Object.values(green);

const ColorNameList = [
  { name: "Blue", data: blueColorLists },
  { name: "Yellow", data: yellowColorLists },
  { name: "Red", data: redColorLists },
  { name: "Orange", data: orangeColorLists },
  { name: "Cyan", data: cyanColorLists },
  { name: "Grey", data: greyColorLists },
  { name: "Green", data: greenColorLists },
];

export default function ColorBox() {
  return (
    <>
      <Title variant="title1">Color</Title>

      {ColorNameList.map((item) => {
        return (
          <Box key={item.name}>
            <SubTitle variant="subtitle1">{item.name}</SubTitle>
            <Stack direction="row" sx={{ mb: 2.5 }}>
              {item.data.map((item, index) => {
                return (
                  <Box
                    key={item}
                    sx={{ width: 80, height: 50, p: 1, backgroundColor: item }}
                  >
                    <Typography
                      sx={{ color: index < 5 ? "black" : "white" }}
                      variant="body2"
                    >
                      {item}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        );
      })}
    </>
  );
}

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 2,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 0.5,
}));
