"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  allowedRoutes?: string[]; // Daftar rute yang diizinkan tanpa autentikasi
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoutes = ["/register", "/"] }) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    // Mengambil nilai cookie yang diperlukan
    const userCookie = Cookies.get("user");

    // Periksa jika pengguna tidak memiliki cookie dan bukan berada di rute yang diizinkan
    if (!userCookie && !isAllowedRoute(pathName, allowedRoutes)) {
      router.push("/login"); // Redirect ke halaman login jika tidak ada cookie
    }
  }, [router]);

  // Fungsi untuk memeriksa apakah rute saat ini diizinkan tanpa autentikasi
  const isAllowedRoute = (currentRoute: string, allowedRoutes: string[]): boolean => {
    return allowedRoutes.includes(currentRoute);
  };

  return <>{children}</>;
};

export default ProtectedRoute;

