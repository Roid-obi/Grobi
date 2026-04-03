"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { get, ref } from "firebase/database";
import database from "@/firebaseConfig";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    // Mengambil nilai cookie yang diperlukan
    const userCookie = Cookies.get("user");
    const userIdCookie = Cookies.get("user-id");
    const roleCookie = Cookies.get("role");

    // Redirect ke halaman login jika cookie tidak ada
    if (!userCookie || !userIdCookie || !roleCookie) {
      router.push("/login");
      return;
    }

    // Mengatur state berdasarkan nilai cookie
    setUsername(userCookie);
    setRole(roleCookie);

    // Mengambil informasi pengguna dari database (contoh: Firebase)
    const getUserProfile = async () => {
      try {
        // Panggil fungsi untuk mengambil informasi pengguna dari database
        const userProfile = await fetchUserProfile(userIdCookie);

        if (userProfile) {
          setFullname(userProfile.fullname);
          setEmail(userProfile.email);
          setAbout(userProfile.about ?? "-");
          setProfilePicture(userProfile["profile-picture"] ?? "");
          setRole(userProfile.role);
        } else {
          console.error("Informasi pengguna tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil informasi pengguna:", error);
      }
    };

    // Panggil fungsi untuk mengambil informasi pengguna
    getUserProfile();
  }, [router]);

  // Fungsi untuk mengambil informasi pengguna dari database (contoh: Firebase)
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    const user = snapshot.val() as LegacyUserProfile | UserProfile;
    return {
      username: user.username,
      email: user.email,
      role: user.role,
      fullname: "fullname" in user ? user.fullname : user.fullName,
      "profile-picture": "profile-picture" in user ? user["profile-picture"] : undefined,
      about: "about" in user ? user.about : undefined,
    };
  };

  const handleLogout = () => {
    // Hapus semua cookie terkait informasi login pengguna
    Cookies.remove("user");
    Cookies.remove("user-id");
    Cookies.remove("role");

    // Redirect kembali ke halaman login
    router.push("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profil Pengguna</h1>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Nama Lengkap:</strong> {fullname}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>About:</strong> {about || "-"}
      </p>
      <p>
        <strong>Foto Profil:</strong> {profilePicture || "Belum diisi"}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Log Out
      </button>
    </div>
  );
};

export default Profile;

interface UserProfile {
  username: string;
  email: string;
  role: string;
  fullname: string;
  "profile-picture"?: string;
  about?: string;
}

interface LegacyUserProfile {
  username: string;
  email: string;
  role: string;
  fullName: string;
  address?: string;
}
