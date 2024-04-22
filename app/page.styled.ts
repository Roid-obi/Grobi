'use client';
import styled from "styled-components";

export const HomeStyled = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 0px 20px;
  columns: 6;
  column-gap: 10px;

  @media (max-width: 768px) {
    margin-top: 5px;
    padding: 0px 10px;
    columns: 4;
  }
  @media (max-width: 480px) {
    columns: 2;
  }
`;

export const CardImage = styled.div`
  width: 100%;
  margin-bottom: 10px;
  break-inside: avoid;
  img {
    max-width: 100%;
    border-radius: 15px;
  }
`;
