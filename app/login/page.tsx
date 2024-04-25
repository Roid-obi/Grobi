import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Login from "./login";

export const metadata = {
  title: "Grobi Gallery | Login",
};

export default function Page() {
  return (
    <main>
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    </main>
  );
}
