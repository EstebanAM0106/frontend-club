import MyThemeProvider from "@/components/MyThemeProvider";

export const metadata = {
  title: "Club de Leones",
  description:
    "Pagina dedicada a llevar el registro de actividades deportivas de la escuela Club de Leones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MyThemeProvider>{children} </MyThemeProvider>
      </body>
    </html>
  );
}
