"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

interface Props {
  children: ReactNode;
}

export const Provider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
