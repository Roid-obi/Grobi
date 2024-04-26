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

interface LoginProps {}

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

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

          const redirectUrl = `/profile`;
          router.push(redirectUrl);

          setError(false);
        } else {
          setError(true);
          console.log("Username or password is incorrect");
        }
      }
    } catch (error) {
      setError(true);
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

          {error && <p className="">Username or password is incorrect</p>}

          <InputItem>
            <Input onChange={handleUsernameChange} placeHolder="Masukkan username" type="no-icon" value={username} labelText="Username" error={false} errorMessage="" />
          </InputItem>
          <InputItem>
            <Input onChange={handlePasswordChange} placeHolder="Masukkan password" type="password" value={password} labelText="Password" error={false} errorMessage="" />
          </InputItem>

          {/* <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="w-full border p-2 rounded" required />
        </div> */}

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
