import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import BuatAlbum from "./BuatAlbum";

export const metadata = {
  title: "Grobi Gallery | Buat",
};

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <BuatAlbum/>
      </ProtectedRoute>
    </>
  );
}
