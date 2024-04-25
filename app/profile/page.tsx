import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Profile from "./profile";

export const metadata = {
    title: "Grobi Gallery | Profile",
  };

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    </>
  );
}
