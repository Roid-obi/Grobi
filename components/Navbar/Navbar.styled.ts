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
  height: 75px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
`;

export const ContentNavbar = styled.div`
  margin: auto;
  width: 100%;
  padding: 0px 30px;
  display: flex;
  align-items: center;
`;

export const IconNav = styled.div`
  &:hover {
    background-color: red;
  }
  .icon-navbar {
    border-radius: 100%;
    width: 30px;
  }
`;
