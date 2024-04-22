import Image from "next/image";
import { CardImage, HomeStyled } from "./page.styled";
import { imageUrls } from "./DummyImage";

export default function Home() {
  return (
    <main>
      <HomeStyled>
        {imageUrls.map((url, index) => (
          <CardImage>
            <img src={url} alt={`Random Image ${index}`} />
          </CardImage>
        ))}
      </HomeStyled>
    </main>
  );
}
