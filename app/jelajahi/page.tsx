import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Jelajahi from "./jelajahi";

export const metadata = {
  title: "Grobi Gallery | Jelajahi",
};

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <Jelajahi />
      </ProtectedRoute>
    </>
  );
}
