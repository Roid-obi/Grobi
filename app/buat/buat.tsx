"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Buat() {
  const router = useRouter();
  useEffect(() => {});
  const HandleBack = () => {
    router.back();
  };

  return (
    <main>
      Buat :<br />
      <Link href={"/buat/album"}>Buat ALbum</Link><br />
      <Link href={"/buat/foto"}>Buat Foto</Link><br />
      <button onClick={HandleBack}>Back</button>
    </main>
  );
}
