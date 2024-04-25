"use client"
import React from 'react';

interface LoadingSquareProps {
  color?: string;
}

const LoadingSquare: React.FC<LoadingSquareProps> = ({ color }) => {
  const randomColor = () => {
    const colors = ['#011638', '#364156', '#CDCDCD',]; // Warna acak yang bisa dipilih
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const randomHeight = () => {
    return Math.floor(Math.random() * (240 - 100 + 1) + 100); // Tinggi acak antara 100px hingga 240px
  };

  return (
    <div
      style={{
        backgroundColor: color || randomColor(),
        width: '100%',
        height: `${randomHeight()}px`, // Tinggi acak
        borderRadius: "15px"
      }}
    ></div>
  );
};

export default LoadingSquare;
