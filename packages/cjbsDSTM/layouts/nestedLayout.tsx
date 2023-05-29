import React from 'react'
import { Box } from "@mui/material";
interface NestedLayoutsProps {
  children: React.ReactNode
}
export const NestedLayout = ({ children }: NestedLayoutsProps) => {
  return (
    <>
      <Box component='nav'>
        Menu List
      </Box>
      <Box>{children}</Box>
    </>
  )
}
