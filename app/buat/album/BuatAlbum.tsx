"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuatAlbum() {
  const router = useRouter();
  useEffect(() => {});
  const HandleBack = () => {
    router.back();
  };

  return (
    <main>
      Buat Album
      <button onClick={HandleBack}>Back</button>
    </main>
  );
}
