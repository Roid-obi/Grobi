"use client";
import React, { memo, useMemo } from "react";

interface LoadingSquareProps {
  color?: string;
}

const LoadingSquare: React.FC<LoadingSquareProps> = ({ color }) => {
  const backgroundColor = useMemo(() => {
    const colors = ["#011638", "#364156", "#CDCDCD"];
    return color || colors[Math.floor(Math.random() * colors.length)];
  }, [color]);

  const stableHeight = useMemo(() => {
    return Math.floor(Math.random() * (240 - 100 + 1) + 100);
  }, []);

  return (
    <div
      style={{
        backgroundColor,
        width: "100%",
        height: `${stableHeight}px`,
        borderRadius: "15px",
      }}
    ></div>
  );
};

export default memo(LoadingSquare);
