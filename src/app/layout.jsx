"use client";

import MyThemeProvider from "@/components/MyThemeProvider";
import Navegacion from "@/components/Navegacion";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Container from "@mui/material/Container";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MyThemeProvider>
            <Navegacion hideSidebar={isLoginPage} hideLogout={isLoginPage} />
            <Container sx={{ mt: 10, mb: 4 }}>{children}</Container>
          </MyThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
