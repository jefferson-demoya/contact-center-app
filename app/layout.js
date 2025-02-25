import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Contact Center App",
  description: "Aplicación para gestionar agentes y clientes en espera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
