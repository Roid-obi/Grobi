"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ref, get } from "firebase/database";
import database from "@/firebaseConfig"; // Import your Firebase database config

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

  return (
    <div>
      <form onSubmit={onLogin}>
        <h2>Login</h2>

        {error && <p className="">Username or password is incorrect</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="w-full border p-2 rounded" required />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
