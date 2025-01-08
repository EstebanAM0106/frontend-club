import MyThemeProvider from "@/components/MyThemeProvider";
import Navegacion from "@/components/Navegacion";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Club de Leones",
  description:
    "Pagina dedicada a llevar el registro de actividades deportivas de la escuela Club de Leones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MyThemeProvider>
            <Navegacion>{children}</Navegacion>
          </MyThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
