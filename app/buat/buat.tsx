"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Buat() {
  const router = useRouter();
  useEffect(() => {});
  const HandleBack = () => {
    router.back();
  };

  return (
    <main>
      Buat
      <button onClick={HandleBack}>Back</button>
    </main>
  );
}
