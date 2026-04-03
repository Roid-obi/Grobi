"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BackNavbar,
  ButtonLogin,
  ButtonNav,
  ContentNavbar,
  DesktopActions,
  DesktopNav,
  DesktopSearch,
  FormSearch,
  IconButton,
  IconNav,
  MobileActionGroup,
  MobileTabbar,
  NavbarStyled,
  SearchIcon,
  SearchInputWrapper,
  TabItem,
  TopRow,
} from "./Navbar.styled";
import { usePathname } from "next/navigation";
import LogoNav from "@/assets/Logo/grobi-gallery.png";
import Cookies from "js-cookie";
import { Compass, Home, Plus, Search, User } from "lucide-react";

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

  const isProfileActive = pathName.startsWith("/profile");

  return (
    <>
      <BackNavbar>
        <NavbarStyled>
          <ContentNavbar>
            <TopRow>
              <Link href={"/"} className="logo-navbar" aria-label="Beranda">
                <IconNav>
                  <img src={LogoNav.src} alt="Grobi" className="icon-navbar" />
                </IconNav>
              </Link>

              <DesktopNav>
                <Link href={"/"}>
                  <ButtonNav className={pathName === "/" ? "active" : ""}>Beranda</ButtonNav>
                </Link>
                <Link href={"/jelajahi"}>
                  <ButtonNav className={pathName === "/jelajahi" ? "active" : ""}>Jelajahi</ButtonNav>
                </Link>
                <Link href={"/buat"}>
                  <ButtonNav className={pathName.startsWith("/buat") ? "active" : ""}>Buat</ButtonNav>
                </Link>
              </DesktopNav>

              <DesktopSearch>
                <SearchInputWrapper>
                  <SearchIcon>
                    <Search size={18} />
                  </SearchIcon>
                  <FormSearch placeholder="Cari Foto..." />
                </SearchInputWrapper>
              </DesktopSearch>

              <DesktopActions>
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
              </DesktopActions>

              <MobileActionGroup>
                <Link href={"/buat"} aria-label="Buat postingan">
                  <IconButton as="span">
                    <Plus size={20} />
                  </IconButton>
                </Link>
              </MobileActionGroup>
            </TopRow>
          </ContentNavbar>
        </NavbarStyled>
      </BackNavbar>

      <MobileTabbar>
        <Link href={"/"} aria-label="Home">
          <TabItem $active={pathName === "/"}>
            <Home size={20} />
            <span>Home</span>
          </TabItem>
        </Link>
        <Link href={"/jelajahi"} aria-label="Jelajahi">
          <TabItem $active={pathName === "/jelajahi"}>
            <Compass size={20} />
            <span>Jelajahi</span>
          </TabItem>
        </Link>
        <Link href={"/profile"} aria-label="Profile">
          <TabItem $active={isProfileActive}>
            <User size={20} />
            <span>Profile</span>
          </TabItem>
        </Link>
      </MobileTabbar>
      {/* <MobileTabbarSpacer /> */}
    </>
  );
}
