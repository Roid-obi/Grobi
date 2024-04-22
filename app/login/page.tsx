"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  useEffect(() => {});
  const HandleBack = () => {
    router.back();
  };

  return (
    <main>
      login
      <button onClick={HandleBack}>Back</button>
    </main>
  );
}
