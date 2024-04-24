import Navbar from "@/components/Navbar/Navbar";
import StyledComponentsRegistry from "../lib/registry";
import "../styles/global.css";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <StyledComponentsRegistry>
          <main>{children}</main>
        </StyledComponentsRegistry>
        <Footer />
      </body>
    </html>
  );
}
