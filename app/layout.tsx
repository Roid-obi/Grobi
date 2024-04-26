import Navbar from "@/components/Navbar/Navbar";
import StyledComponentsRegistry from "../lib/registry";
import "../styles/global.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <StyledComponentsRegistry>
          <main>{children}</main>
        </StyledComponentsRegistry>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
