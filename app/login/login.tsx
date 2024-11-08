"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ref, get } from "firebase/database";
import database from "@/firebaseConfig"; // Import your Firebase database config
import { ButtonLogin, CardLogin, CloseButton, FormLogin, InputItem, LoginStyled, TitleCard } from "./login.styled";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import CloseIcon from "@/assets/modal/close";
import { imageUrls } from "../DummyImage";
import { CardImage, HomeStyled } from "../page.styled";
import LoadingSquare from "@/components/LoadingSquare/LoadingSquare";
import { toast, Toaster } from 'react-hot-toast'; // Import toast from react-hot-toast

interface LoginProps {}

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();

        const userIds = Object.keys(users);

        const userId = userIds.find((id) => users[id].username === username && users[id].password === password);

        if (userId) {
          Cookies.set("user", users[userId].username, { expires: 7 });
          Cookies.set("role", users[userId].role, { expires: 7 });
          Cookies.set("user-id", userId, { expires: 7 });

          toast.success('Username atau password tidak sesuai'); // Show toast for incorrect username or password
          const redirectUrl = `/`;
          router.push(redirectUrl);
        } else {
          toast.error('Username atau password tidak sesuai'); // Show toast for incorrect username or password
        }
      }
    } catch (error) {
      toast.error('Error logging in'); // Show toast for login error
      console.error("Error logging in:", error);
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
        <FormLogin onSubmit={onLogin}>
          <CloseButton>
            <Link href={"/"}>
              <CloseIcon />
            </Link>
          </CloseButton>
          <TitleCard>Login</TitleCard>
          <InputItem>
            <Input onChange={handleUsernameChange} placeHolder="Masukkan username" type="no-icon" value={username} labelText="Username" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input onChange={handlePasswordChange} placeHolder="Masukkan password" type="password" value={password} labelText="Password" error={false} errorMessage="" />
          </InputItem>
          <ButtonLogin type="submit">Login</ButtonLogin>
        </FormLogin>
      </Modal>
      {imageUrls.map((index) => (
        <CardImage key={index}>
          <LoadingSquare />
        </CardImage>
      ))}
    </HomeStyled>
  );
}
