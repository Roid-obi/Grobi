import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import BuatFoto from "./buatFoto";

export const metadata = {
  title: "Grobi Gallery | Buat",
};

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <BuatFoto />
      </ProtectedRoute>
    </>
  );
}
