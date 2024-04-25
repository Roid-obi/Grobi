import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Buat from "./buat";

export const metadata = {
  title: "Grobi Gallery | Buat",
};

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <Buat />
      </ProtectedRoute>
    </>
  );
}
