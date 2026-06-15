import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LoginForm } from "@/components/features/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin — WasteLink",
  description: "Halaman login untuk admin WasteLink.",
};

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center py-12 px-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Top-left blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(41,158,99,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-right blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(41,158,99,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full" style={{ zIndex: 1 }}>
        <Container>
          <div className="flex flex-col items-center">
            <LoginForm />

            {/* Footer note */}
            <p className="mt-6 text-caption text-text-secondary text-center">
              Hanya akun admin yang terdaftar yang dapat masuk.
            </p>
          </div>
        </Container>
      </div>
    </main>
  );
}
