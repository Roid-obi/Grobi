"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BackNavbar, ButtonLogin, ButtonNav, ButtonRegister, ContentNavbar, FormSearch, IconNav, NavbarStyled } from "./Navbar.styled";
import { usePathname } from "next/navigation";
import LogoNav from "@/assets/Logo/grobi-gallery.png";
import Cookies from "js-cookie";

export default function Navbar() {
  const [tokenExists, setTokenExists] = useState(false);
  const pathName = usePathname();
  // Jika tidak dalam keadaan loading, tampilkan navbar dengan logo dan tombol navigasi
  useEffect(() => {
    const token = Cookies.get("user-id"); // Gantilah 'token' dengan nama yang sesuai dari Cookies Anda
    setTokenExists(!!token); // Set tokenExists menjadi true jika token ada, false jika tidak
  }, []);

  const handleLogout = () => {
    Cookies.remove("user-id"); // Hapus token dari cookies
    Cookies.remove("user"); // Hapus token dari cookies
    Cookies.remove("role"); // Hapus token dari cookies
    setTokenExists(false); // Set tokenExists menjadi false setelah logout
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
            <ButtonNav className={pathName.startsWith("/buat") ? "active" : ""}>Buat</ButtonNav>
          </Link>
          <FormSearch placeholder="Cari Foto..." />
          {!tokenExists ? (
            <>
              <Link href={"/login"}>
                <ButtonLogin>Masuk</ButtonLogin>
              </Link>
              <Link href={"/register"}>
                <ButtonNav>Daftar</ButtonNav>
              </Link>
            </>
          ) : (
            <ButtonNav onClick={handleLogout}>Keluar</ButtonNav>
          )}
        </ContentNavbar>
      </NavbarStyled>
    </BackNavbar>
  );
}
