import { CardImage, HomeStyled } from "./page.styled";
import { imageUrls } from "./DummyImage";
import Beranda from "./beranda";

export const metadata = {
  title: 'Grobi Gallery | Beranda',
};

export default function Home() {
  return (
    <main>
      <Beranda />
    </main>
  );
}
