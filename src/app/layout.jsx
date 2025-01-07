import MyThemeProvider from "@/components/MyThemeProvider";
import Navegacion from "@/components/Navegacion";

export const metadata = {
  title: "Club de Leones",
  description:
    "Pagina dedicada a llevar el registro de actividades deportivas de la escuela Club de Leones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MyThemeProvider>
          <Navegacion />
          {children}
        </MyThemeProvider>
      </body>
    </html>
  );
}
