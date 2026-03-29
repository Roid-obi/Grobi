import Navbar from "@/components/Navbar/Navbar";
import "../styles/global.css";
import { Toaster } from "react-hot-toast";
import StyledComponentsRegistry from "./lib/registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
