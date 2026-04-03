"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ref, push, set } from "firebase/database";
import database from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { ButtonRegister, CloseButton, FormRegister, InputItem, TitleCard, WelcomeSection, LogoWrapper, WelcomeTitle, WelcomeTagline, LoginLink, ButtonWrapper } from "./register.styled";
import Input from "@/components/Input/Input";
import CloseIcon from "@/assets/modal/close";
import Link from "next/link";
import { CardImage, HomeStyled } from "../page.styled";
import { imageUrls } from "../DummyImage";
import LoadingSquare from "@/components/LoadingSquare/LoadingSquare";
import toast from "react-hot-toast";
import LogoNav from "@/assets/Logo/grobi-gallery.png";

interface RegisterProps {
  // Tambahkan properti jika diperlukan
}

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  fullname: string;
  profile_picture?: string;
  about?: string;
}

const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const router = useRouter();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFullnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(e.target.value);
  };

  const handleAboutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };

  const addUserToDatabase = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi semua data harus diisi
    if (!username || !password || !email || !fullname) {
      toast.error("Semua data harus diisi");
      return;
    }

    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef);

    const newUser: User = {
      username: username,
      email: email,
      password: password,
      role: "user",
      fullname: fullname,
      ...(profilePicture.trim() ? { profile_picture: profilePicture.trim() } : {}),
      ...(about.trim() ? { about: about.trim() } : {}),
    };

    try {
      await set(newUserRef, newUser);
      console.log("User berhasil ditambahkan ke database");

      // Reset state setelah submit berhasil
      setUsername("");
      setPassword("");
      setEmail("");
      setFullname("");
      setProfilePicture("");
      setAbout("");
      router.push("/login");
    } catch (error) {
      console.error("Error menambahkan user ke database:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HomeStyled>
      <Modal open={true} onClose={handleCloseModal}>
        <FormRegister onSubmit={addUserToDatabase}>
          <CloseButton>
            <Link href={"/"}>
              <CloseIcon />
            </Link>
          </CloseButton>
          <WelcomeSection>
            <LogoWrapper>
              <img src={LogoNav.src} alt="Grobi" />
            </LogoWrapper>
            <WelcomeTitle>Welcome to Grobi</WelcomeTitle>
            <WelcomeTagline>Your daily dose of visuals.</WelcomeTagline>
          </WelcomeSection>
          <InputItem>
            <Input onChange={handleUsernameChange} placeHolder="Masukkan username" type="no-icon" value={username} labelText="Username" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input onChange={handlePasswordChange} placeHolder="Masukkan password" type="password" value={password} labelText="Password" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input onChange={handleEmailChange} placeHolder="Masukkan email" type="no-icon" value={email} labelText="Email" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input onChange={handleFullnameChange} placeHolder="Masukkan nama lengkap" type="no-icon" value={fullname} labelText="Nama Lengkap" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input
              onChange={handleProfilePictureChange}
              placeHolder="Masukkan URL foto profil (opsional)"
              type="no-icon"
              value={profilePicture}
              labelText="Foto Profil"
              error={false}
              errorMessage=""
            />
          </InputItem>
          <InputItem>
            <Input onChange={handleAboutChange} placeHolder="Ceritakan tentang kamu (opsional)" type="no-icon" value={about} labelText="About" error={false} errorMessage="" />
          </InputItem>
          <ButtonWrapper>
            <ButtonRegister type="submit">Register</ButtonRegister>
            <LoginLink>
              Sudah punya akun? <Link href="/login">Masuk di sini</Link>
            </LoginLink>
          </ButtonWrapper>
        </FormRegister>
      </Modal>
      {imageUrls.map((index) => (
        <CardImage key={index}>
          <LoadingSquare />
        </CardImage>
      ))}
    </HomeStyled>
  );
};

export default Register;
