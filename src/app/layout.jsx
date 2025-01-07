import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MyThemeProvider from "@/components/MyThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Club de Leones",
  description:
    "Pagina dedicada a llevar el registro de actividades deportivas de la escuela Club de Leones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MyThemeProvider>{children}</MyThemeProvider>
      </body>
    </html>
  );
}
