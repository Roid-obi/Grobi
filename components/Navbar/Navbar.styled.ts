import styled from "styled-components";

export const BackNavbar = styled.div`
  width: 100%;
  height: 80px;
`;

export const NavbarStyled = styled.nav`
  background-color: var(--white);
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
`;

export const ContentNavbar = styled.div`
  margin: auto;
  width: 100%;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  a {
    text-decoration: none;
  }
`;

export const IconNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  cursor: pointer;
  transition: background-color 0.3s; /* Transisi untuk perubahan background-color saat hover */
  &:hover {
    background-color: var(--tp-gray);
  }
  &:active {
    background-color: var(--acv-gray);
    .icon-navbar {
      width: 20px;
      transition: width 0.3s; /* Transisi untuk perubahan width saat active */
    }
  }
  .icon-navbar {
    align-items: center;
    border-radius: 100%;
    width: 24px;
    transition: width 0.3s; /* Transisi untuk perubahan width */
  }
`;

export const ButtonNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-weight: 600;

  color: var(--black);
  background: var(--white);
  cursor: pointer;

  &.active {
    color: var(--white);
    background: var(--black);
  }

  &:hover {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(135, 136, 138, 0.25), 0px 0px 0px 3.5px rgba(206, 210, 216, 0.5);
    outline: 0;
  }
`;
