"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ref, push, set } from "firebase/database";
import database from "@/firebaseConfig";
import { useRouter } from "next/navigation";

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

    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef);

    const newUser: User = {
      username: username,
      password: password,
      email: email,
      fullName: fullName,
      address: address,
      role: "user", // Set role ke "user"
    };

    try {
      await set(newUserRef, newUser);
      console.log("User berhasil ditambahkan ke database");

      // Reset state setelah submit berhasil
      setUsername("");
      setPassword("");
      setEmail("");
      setFullName("");
      setAddress("");
      router.push('/login');
    } catch (error) {
      console.error("Error menambahkan user ke database:", error);
    }
  };

  return (
    <form onSubmit={addUserToDatabase}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div>
        <label htmlFor="fullName">Nama Lengkap</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="address">Alamat</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div>
        <button type="submit">Tambah User</button>
      </div>
    </form>
  );
};

export default Register;
