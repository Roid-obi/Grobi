"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    // Mengambil nilai cookie yang diperlukan
    const userCookie = Cookies.get("user");
    const userIdCookie = Cookies.get("user-id");
    const roleCookie = Cookies.get("role");
    console.log()

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
          setFullName(userProfile.fullName);
          setEmail(userProfile.email);
          setAddress(userProfile.address);
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

    // Contoh pengambilan data statis (simulasi)
    const userProfile: UserProfile | null = {
      fullName: "???",
      email: "???",
      address: "???",
    };

    return userProfile;
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
        <strong>Nama Lengkap:</strong> {fullName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Alamat:</strong> {address}
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
  fullName: string;
  email: string;
  address: string;
}
