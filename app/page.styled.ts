'use client';
import styled from "styled-components";

export const HomeStyled = styled.div`
  margin: 10px auto 0px auto;
  width: 100%;
  max-width: 1600px;
  padding: 0px 16px;
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
  cursor: pointer;
  img {
    max-width: 100%;
    border-radius: 15px;
  }
`;
