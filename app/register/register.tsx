"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ref, push, set } from "firebase/database";
import database from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { ButtonRegister, CloseButton, FormRegister, InputItem, TitleCard } from "./register.styled";
import Input from "@/components/Input/Input";
import CloseIcon from "@/assets/modal/close";
import Link from "next/link";
import { CardImage, HomeStyled } from "../page.styled";
import { imageUrls } from "../DummyImage";
import LoadingSquare from "@/components/LoadingSquare/LoadingSquare";
import toast from "react-hot-toast";

interface RegisterProps {
  // Tambahkan properti jika diperlukan
}

interface User {
  username: string;
  password: string;
  email: string;
  fullName: string;
  address: string;
  role: string; // Tambah properti role
}

const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
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

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const addUserToDatabase = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validasi semua data harus diisi
    if (!username || !password || !email || !fullName || !address) {
      toast.error('Semua data harus diisi');
      return;
    }
  
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
  
    const newUser: User = {
      username: username,
      password: password,
      email: email,
      fullName: fullName,
      address: address,
      role: 'user',
    };
  
    try {
      await set(newUserRef, newUser);
      console.log('User berhasil ditambahkan ke database');
  
      // Reset state setelah submit berhasil
      setUsername('');
      setPassword('');
      setEmail('');
      setFullName('');
      setAddress('');
      router.push('/login');
    } catch (error) {
      console.error('Error menambahkan user ke database:', error);
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
          <TitleCard>Register</TitleCard>
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
            <Input onChange={handleFullNameChange} placeHolder="Masukkan nama lengkap" type="no-icon" value={fullName} labelText="Nama Lengkap" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input onChange={handleAddressChange} placeHolder="Masukkan alamat" type="no-icon" value={address} labelText="Alamat" error={false} errorMessage="" />
          </InputItem>
          <ButtonRegister type="submit">Register</ButtonRegister>
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
