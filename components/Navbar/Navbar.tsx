"use client";
import { BackNavbar, ContentNavbar, IconNav, NavbarStyled } from "./Navbar.styled";

export default function Navbar() {
  return (
    <BackNavbar>
      <NavbarStyled>
        <ContentNavbar>
          <IconNav>
            <img src={"https://i.pinimg.com/originals/87/b2/e1/87b2e1b919a9307b46a13f1a802caa5d.jpg"} alt="..." className="icon-navbar" />
          </IconNav>
        </ContentNavbar>
      </NavbarStyled>
    </BackNavbar>
  );
}
