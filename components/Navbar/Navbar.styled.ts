import styled from "styled-components";

export const BackNavbar = styled.div<{ $mobileSearchOpen: boolean }>`
  width: 100%;
  height: 80px;

  @media (max-width: 768px) {
    height: ${(props) => (props.$mobileSearchOpen ? "132px" : "72px")};
  }
`;

export const NavbarStyled = styled.nav`
  background-color: var(--white);
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid var(--border);
  z-index: 40;
`;

export const ContentNavbar = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1600px;
  padding: 0 16px;

  a {
    text-decoration: none;
  }
`;

export const TopRow = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    height: 72px;
  }
`;

export const IconNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--tp-gray);
  }

  &:active {
    background-color: var(--acv-gray);

    .icon-navbar {
      width: 20px;
      transition: width 0.3s;
    }
  }

  .icon-navbar {
    align-items: center;
    border-radius: 100%;
    width: 24px;
    transition: width 0.3s;
  }

  @media (max-width: 768px) {
    .icon-navbar {
      width:40px;
    }
  }
`;

export const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-weight: 500;
  color: var(--black);
  background: var(--white);
  cursor: pointer;

  &.active {
    color: var(--white);
    background: var(--black);
  }

  &:focus {
    box-shadow:
      inset 0 0.8px 0 -0.25px rgba(255, 255, 255, 0.2),
      0 0.5px 1.5px rgba(135, 136, 138, 0.25),
      0 0 0 3.5px rgba(206, 210, 216, 0.5);
  }

  &:active {
    box-shadow:
      inset 0 0.8px 0 -0.25px rgba(255, 255, 255, 0.2),
      0 0.5px 1.5px rgba(135, 136, 138, 0.25),
      0 0 0 3.5px rgba(206, 210, 216, 0.5);
    opacity: 0.8;
  }

  &:hover {
    box-shadow:
      inset 0 0.8px 0 -0.25px rgba(255, 255, 255, 0.2),
      0 0.5px 1.5px rgba(135, 136, 138, 0.25),
      0 0 0 3.5px rgba(206, 210, 216, 0.5);
    outline: 0;
  }
`;

export const DesktopSearch = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormSearch = styled.input`
  width: 100%;
  padding: 0 16px;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  color: #767676;
  background: #ececec93;

  &::placeholder {
    color: #767676;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow:
      inset 0 0.8px 0 -0.25px rgba(255, 255, 255, 0.2),
      0 0.5px 1.5px rgba(135, 136, 138, 0.25),
      0 0 0 3.5px rgba(206, 210, 216, 0.5);
    outline: 0;
  }
`;

export const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-weight: 600;
  color: var(--white);
  background: var(--primary);
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  &:hover {
    box-shadow:
      inset 0 0.8px 0 -0.25px rgba(255, 255, 255, 0.2),
      0 0.5px 1.5px rgba(135, 136, 138, 0.25),
      0 0 0 3.5px rgba(206, 210, 216, 0.5);
    outline: 0;
  }
`;

export const MobileActionGroup = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 999px;
  background: var(--tp-gray);
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    transform: scale(0.96);
  }
`;

export const MobileSearchWrapper = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$open ? "block" : "none")};
    padding: 0 0 12px;
  }
`;

export const MobileTabbar = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 64px;
    background: var(--white);
    border-top: 1px solid var(--border);
    z-index: 45;

    a {
      text-decoration: none;
    }
  }
`;

export const MobileTabbarSpacer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    height: 64px;
  }
`;

export const TabItem = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: ${(props) => (props.$active ? "var(--black)" : "#767676")};

  span {
    font-size: 11px;
    font-weight: ${(props) => (props.$active ? 600 : 500)};
  }
`;
