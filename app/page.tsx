import Image from "next/image";
import { CardImage, HomeStyled } from "./page.styled";
import { imageUrls } from "./DummyImage";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
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
