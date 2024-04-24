"use client";
import { useState } from 'react';
import { CardImage, HomeStyled } from './page.styled';
import { imageUrls } from './DummyImage';

export default function Beranda() {
  const [loadingImages, setLoadingImages] = useState(true);

  // Fungsi untuk menandai bahwa semua gambar telah dimuat
  const handleAllImagesLoaded = () => {
    setLoadingImages(false);
  };

  return (
    <main>
      <HomeStyled>
        {imageUrls.map((url, index) => (
          <CardImage key={index}>
            {loadingImages && <p>Loading...</p>}
            <img
              src={url}
              alt={`Random Image ${index}`}
              onLoad={handleAllImagesLoaded} // Memanggil handleAllImagesLoaded saat gambar selesai dimuat
              style={{ display: loadingImages ? 'none' : 'block' }} // Menyembunyikan gambar selama loading masih berlangsung
            />
          </CardImage>
        ))}
      </HomeStyled>
    </main>
  );
}
