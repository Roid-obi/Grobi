import Navbar from "@/components/Navbar/Navbar";
import "../styles/global.css";
import { Toaster } from "react-hot-toast";
import StyledComponentsRegistry from "./lib/registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
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
