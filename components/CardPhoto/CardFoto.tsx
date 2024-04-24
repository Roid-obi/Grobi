"use client";
import React, { useState } from "react";
import styled from "styled-components";

// Props untuk komponen Card
interface CardProps {
  imageUrl: string;
}

// Styled komponen untuk Card
const CardContainer = styled.div``;

const CardImage = styled.img``;

const CardOverlay = styled.div``;

export default function Card({ imageUrl }: CardProps) {
  return (
    <CardContainer>
      <CardImage src={imageUrl} alt="Card" />
      <CardOverlay></CardOverlay>
    </CardContainer>
  );
}
