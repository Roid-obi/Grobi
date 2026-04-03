"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { DangerNote, ResultBox, SeedButton, SeedCard, SeedDescription, SeedPageWrapper, SeedTitle } from "./seed.styled";

type SeedResult = {
  message: string;
  users: number;
  photos: number;
  boards: number;
  saves: number;
};

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);

  const runSeed = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/seed/refresh", {
        method: "POST",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Gagal menjalankan seed data");
      }

      setResult(data as SeedResult);
      toast.success("Seed selesai. Data berhasil di-refresh.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan";
      toast.error(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeedPageWrapper>
      <SeedCard>
        <SeedTitle>Seed Data Awal</SeedTitle>
        <SeedDescription>
          Tombol ini akan menghapus seluruh data pada Firebase Realtime Database dan aset Cloudinary, kemudian mengisi ulang data users, photos, boards, dan saves dari awal.
        </SeedDescription>
        <DangerNote>Gunakan hanya untuk development/testing.</DangerNote>

        <SeedButton onClick={runSeed} disabled={loading}>
          {loading ? "Proses Seeding..." : "Seed Ulang Data"}
        </SeedButton>

        {result ? <ResultBox>{JSON.stringify(result, null, 2)}</ResultBox> : null}
      </SeedCard>
    </SeedPageWrapper>
  );
}
