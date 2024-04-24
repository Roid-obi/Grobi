"use client";
import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
`;

const SkeletonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0; /* Warna latar belakang untuk skeleton */
  border-radius: 4px;
`;

const SkeletonLoading = styled.div`
  width: 100%;
  height: 100%;
  animation: ${loadingAnimation} 1.5s linear infinite;
  background: linear-gradient(90deg, #f0f0f0 0%, #d0d0d0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
`;

const Skeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonLoading />
    </SkeletonWrapper>
  );
};

export default Skeleton;
