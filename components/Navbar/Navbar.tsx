"use client";
import Link from "next/link";
import { BackNavbar, ButtonNav, ContentNavbar, IconNav, NavbarStyled } from "./Navbar.styled";
import { usePathname } from "next/navigation";
import LogoNav from "@/assets/Logo/logo-grobi.png"

export default function Navbar() {
  const pathName = usePathname();
  // Jika tidak dalam keadaan loading, tampilkan navbar dengan logo dan tombol navigasi
  return (
    <BackNavbar>
      <NavbarStyled>
        <ContentNavbar>
            <IconNav>
              <img src={LogoNav.src} alt="..." className="icon-navbar" />
            </IconNav>
          <Link href={"/"}>
            <ButtonNav className={pathName === "/" ? "active" : ""}>Beranda</ButtonNav>
          </Link>
          <Link href={"/jelajahi"}>
            <ButtonNav className={pathName === "/jelajahi" ? "active" : ""}>Jelajahi</ButtonNav>
          </Link>
          <Link href={"/buat"}>
            <ButtonNav className={pathName === "/buat" ? "active" : ""}>Buat</ButtonNav>
          </Link>
        </ContentNavbar>
      </NavbarStyled>
    </BackNavbar>
  );
}
