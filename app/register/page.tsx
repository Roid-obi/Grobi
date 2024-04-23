"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ref, push, set, Database } from "firebase/database";
import database from "@/firebaseConfig";

interface RegisterProps {
  // Tambahkan properti jika diperlukan
}

interface User {
  username: string;
  password: string;
  role: string;
}

const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const addUserToDatabase = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef);

    const newUser: User = {
      username: username,
      password: password,
      role: role,
    };

    try {
      await set(newUserRef, newUser);
      console.log("User berhasil ditambahkan ke database");

      setUsername("");
      setPassword("");
      setRole("");
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
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={handleRoleChange}
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
