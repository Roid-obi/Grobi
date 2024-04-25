import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Register from "./register";

export const metadata = {
    title: "Grobi Gallery | Register",
  };

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    </>
  );
}
