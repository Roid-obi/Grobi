import styled from "styled-components";

export const SeedPageWrapper = styled.main`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const SeedCard = styled.section`
  width: 100%;
  max-width: 720px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--white);
  padding: 24px;
`;

export const SeedTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--black);
`;

export const SeedDescription = styled.p`
  margin: 12px 0 0;
  color: #5b5b5b;
  line-height: 1.5;
`;

export const DangerNote = styled.p`
  margin: 12px 0 0;
  color: #b42318;
  font-size: 14px;
  font-weight: 600;
`;

export const SeedButton = styled.button`
  margin-top: 20px;
  height: 48px;
  border-radius: 24px;
  border: none;
  background: var(--primary);
  color: var(--white);
  font-weight: 600;
  padding: 0 22px;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const ResultBox = styled.pre`
  margin-top: 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #f7f7f8;
  padding: 14px;
  color: #1b1b1b;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 13px;
`;
