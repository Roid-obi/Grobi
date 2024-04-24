"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Jelajahi() {
  const router = useRouter();
  useEffect(() => {});
  const HandleBack = () => {
    router.back();
  };

  return (
    <main>
      Jelajahi
      <button onClick={HandleBack}>Back</button>
    </main>
  );
}
