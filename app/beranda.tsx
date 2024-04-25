"use client";
import { useState } from 'react';
import { CardImage, HomeStyled } from './page.styled';
import { imageUrls } from './DummyImage';
import LoadingSquare from '@/components/LoadingSquare/LoadingSquare';

export default function Beranda() {
  const [loadingImages, setLoadingImages] = useState(true);

  // Fungsi untuk menandai bahwa semua gambar telah dimuat
  const handleAllImagesLoaded = () => {
    setLoadingImages(false);
  };

  return (
    <>
      <HomeStyled>
        {imageUrls.map((url, index) => (
          <CardImage key={index}>
            {loadingImages && <LoadingSquare />}
            <img
              src={url}
              alt={`Random Image ${index}`}
              onLoad={handleAllImagesLoaded} // Memanggil handleAllImagesLoaded saat gambar selesai dimuat
              style={{ display: loadingImages ? 'none' : 'block' }} // Menyembunyikan gambar selama loading masih berlangsung
            />
          </CardImage>
        ))}
      </HomeStyled>
    </>
  );
}
