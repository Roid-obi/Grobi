"use client";
import { useState } from "react";
import Link from "next/link";
import { BackNavbar, ButtonLogin, ButtonNav, ButtonRegister, ContentNavbar, FormSearch, IconNav, NavbarStyled } from "./Navbar.styled";
import { usePathname } from "next/navigation";
import LogoNav from "@/assets/Logo/grobi-gallery.png";
import Cookies from "js-cookie";
import Modal from "../Modal/Modal";

export default function Navbar() {
  const pathName = usePathname();
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  // Jika tidak dalam keadaan loading, tampilkan navbar dengan logo dan tombol navigasi
  const handleOpenModalLogin = () => {
    setIsModalLoginOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalLoginOpen(false);
  };
  
  return (
    <BackNavbar>
      <NavbarStyled>
        <ContentNavbar>
          <Link href={"/"} className="logo-navbar">
            <IconNav>
              <img src={LogoNav.src} alt="..." className="icon-navbar" />
            </IconNav>
          </Link>
          <Link href={"/"}>
            <ButtonNav className={pathName === "/" ? "active" : ""}>Beranda</ButtonNav>
          </Link>
          <Link href={"/jelajahi"}>
            <ButtonNav className={pathName === "/jelajahi" ? "active" : ""}>Jelajahi</ButtonNav>
          </Link>
          <Link href={"/buat"}>
            <ButtonNav className={pathName === "/buat" ? "active" : ""}>Buat</ButtonNav>
          </Link>
          <FormSearch placeholder="Cari Foto..." />
          <>
            {/* <Link href={"/login"}> */}
              <ButtonLogin onClick={handleOpenModalLogin}>Masuk</ButtonLogin>
            {/* </Link> */}
            <Link href={"/register"}>
              <ButtonRegister>Daftar</ButtonRegister>
            </Link>
          </>
        </ContentNavbar>
      </NavbarStyled>
      <Modal open={isModalLoginOpen} onClose={handleCloseModal}>
      taruh form login disini
    </Modal>
    </BackNavbar>
  );
}
