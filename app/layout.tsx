import StyledComponentsRegistry from '../lib/registry';
import '../styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
            <main>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
