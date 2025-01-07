"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Geist, Geist_Mono } from "next/font/google";
import { deepOrange, indigo } from "@mui/material/colors";

// Importar las fuentes con las variables CSS
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Definir tu tema personalizado de MUI
const customTheme = createTheme({
  palette: {
    primary: {
      main: indigo[500], // Usando un tono de azul de Material UI
    },
    secondary: {
      main: deepOrange[500], // Usando un tono de naranja de Material UI
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: [geistSans.style.fontFamily, "Arial", "sans-serif"].join(", "),
    mono: "var(--font-geist-mono), monospace",
  },
});

const MyThemeProvider = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default MyThemeProvider;
