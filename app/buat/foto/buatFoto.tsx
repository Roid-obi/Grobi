"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BuatFoto() {
  const router = useRouter();
  useEffect(() => {});
  const HandleBack = () => {
    router.back();
  };

  return (
    <main>
      Buat Foto
      <button onClick={HandleBack}>Back</button>
    </main>
  );
}
