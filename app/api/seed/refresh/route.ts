import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";

export const runtime = "nodejs";

type SeedUser = {
  username: string;
  email: string;
  password: string;
  fullname: string;
  role: "user" | "admin";
  profile_picture?: string;
  about: string;
  created_at: number;
  updated_at: number;
};

type SeedPhoto = {
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  user_id: string;
  author_name: string;
  tags: string[];
  category: string;
  created_at: number;
};

type SeedBoard = {
  name: string;
  description: string;
  user_id: string;
  is_private: boolean;
  cover_image: string;
  created_at: number;
};

type SeedSave = {
  photo_id: string;
  board_id: string;
  user_id: string;
  saved_at: number;
};

type UploadedAsset = {
  fileName: string;
  imageUrl: string;
  thumbnailUrl: string;
};

const firebaseConfig = {
  apiKey: "AIzaSyB9FxJ_f96TqSFv7wR312wLPhO4pZGnfhI",
  authDomain: "grobi-gallery.firebaseapp.com",
  databaseURL: "https://grobi-gallery-default-rtdb.firebaseio.com",
  projectId: "grobi-gallery",
  storageBucket: "grobi-gallery.firebasestorage.app",
  messagingSenderId: "1091941921955",
  appId: "1:1091941921955:web:537de03713580281aefb16",
};

function getServerDatabase() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getDatabase(app);
}

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Konfigurasi Cloudinary belum lengkap. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET.");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

async function deleteCloudinaryByResourceType(resourceType: "image" | "video" | "raw") {
  let nextCursor: string | undefined;

  do {
    const response = await cloudinary.api.resources({
      resource_type: resourceType,
      type: "upload",
      max_results: 500,
      next_cursor: nextCursor,
    });

    const publicIds = (response.resources || []).map((resource: { public_id: string }) => resource.public_id);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds, {
        resource_type: resourceType,
        type: "upload",
        invalidate: true,
      });
    }

    nextCursor = response.next_cursor;
  } while (nextCursor);
}

async function wipeCloudinaryData() {
  await deleteCloudinaryByResourceType("image");
  await deleteCloudinaryByResourceType("video");
  await deleteCloudinaryByResourceType("raw");
}

function toTitleFromFilename(fileName: string) {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  return withoutExt
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function toTagsFromFilename(fileName: string) {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  return withoutExt
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((item) => item.toLowerCase());
}

async function uploadDummyImages() {
  const dummyDir = path.join(process.cwd(), "assets", "dummy-img");
  const files = await fs.readdir(dummyDir);
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

  if (imageFiles.length === 0) {
    throw new Error("Folder assets/dummy-img tidak memiliki file gambar untuk seed photos.");
  }

  const uploadedAssets: UploadedAsset[] = [];

  for (const fileName of imageFiles) {
    const fullPath = path.join(dummyDir, fileName);
    const uploadResult = await cloudinary.uploader.upload(fullPath, {
      folder: "grobi-seed/photos",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    const thumbnailUrl = cloudinary.url(uploadResult.public_id, {
      secure: true,
      fetch_format: "auto",
      quality: "auto",
      width: 480,
      crop: "fill",
    });

    uploadedAssets.push({
      fileName,
      imageUrl: uploadResult.secure_url,
      thumbnailUrl,
    });
  }

  return uploadedAssets;
}

export async function POST() {
  try {
    configureCloudinary();
    const database = getServerDatabase();

    await wipeCloudinaryData();
    await set(ref(database), null);

    const uploadedAssets = await uploadDummyImages();
    const now = Date.now();

    const usersRef = ref(database, "users");
    const photosRef = ref(database, "photos");
    const boardsRef = ref(database, "boards");
    const savesRef = ref(database, "saves");

    const usersMap: Record<string, SeedUser> = {};

    const adminId = push(usersRef).key;
    if (!adminId) {
      throw new Error("Gagal membuat ID admin user");
    }

    usersMap[adminId] = {
      username: "grobi-admin",
      email: "grobi-admin@grobi.local",
      password: "grobi123",
      fullname: "Grobi Administrator",
      role: "admin",
      profile_picture:"",
      about: "Admin bawaan untuk kebutuhan manajemen awal.",
      created_at: now,
      updated_at: now,
    };

    const defaultUsers = [
      {
        username: "dika",
        email: "dika@grobi.local",
        fullname: "Dika Pratama",
        about: "Suka eksplor foto jalanan dan arsitektur.",
      },
      {
        username: "salsa",
        email: "salsa@grobi.local",
        fullname: "Salsa Putri",
        about: "Photographer food dan lifestyle.",
      },
      {
        username: "raka",
        email: "raka@grobi.local",
        fullname: "Raka Mahendra",
        about: "Fokus pada portrait dan color grading.",
      },
    ];

    for (const user of defaultUsers) {
      const userId = push(usersRef).key;
      if (!userId) {
        throw new Error("Gagal membuat ID user seed");
      }

      usersMap[userId] = {
        username: user.username,
        email: user.email,
        password: "123456",
        fullname: user.fullname,
        role: "user",
        profile_picture: "",
        about: user.about,
        created_at: now,
        updated_at: now,
      };
    }

    await set(usersRef, usersMap);

    const userIds = Object.keys(usersMap);
    const normalUserIds = userIds.filter((userId) => usersMap[userId].role === "user");

    const categories = ["nature", "portrait", "food", "travel", "street"];
    const photosMap: Record<string, SeedPhoto> = {};

    for (let i = 0; i < uploadedAssets.length; i += 1) {
      const photoId = push(photosRef).key;
      if (!photoId) {
        throw new Error("Gagal membuat ID photo seed");
      }

      const ownerId = normalUserIds[i % normalUserIds.length];
      const owner = usersMap[ownerId];
      const asset = uploadedAssets[i];
      const title = toTitleFromFilename(asset.fileName);
      const tags = toTagsFromFilename(asset.fileName);

      photosMap[photoId] = {
        title,
        description: `Koleksi foto ${title} untuk data awal Grobi.`,
        image_url: asset.imageUrl,
        thumbnail_url: asset.thumbnailUrl,
        user_id: ownerId,
        author_name: owner.username,
        tags,
        category: categories[i % categories.length],
        created_at: now + i,
      };
    }

    await set(photosRef, photosMap);

    const boardsMap: Record<string, SeedBoard> = {};
    const boardIdList: string[] = [];

    const boardTemplates = [
      { name: "Inspirasi Harian", description: "Kumpulan referensi visual untuk ide baru.", isPrivate: false },
      { name: "Moodboard Konten", description: "Board untuk aset konten mingguan.", isPrivate: false },
      { name: "Koleksi Pribadi", description: "Board private untuk foto favorit.", isPrivate: true },
    ];

    for (let i = 0; i < boardTemplates.length; i += 1) {
      const boardId = push(boardsRef).key;
      if (!boardId) {
        throw new Error("Gagal membuat ID board seed");
      }

      const ownerId = normalUserIds[i % normalUserIds.length];
      const coverAsset = uploadedAssets[i % uploadedAssets.length];

      boardsMap[boardId] = {
        name: boardTemplates[i].name,
        description: boardTemplates[i].description,
        user_id: ownerId,
        is_private: boardTemplates[i].isPrivate,
        cover_image: coverAsset.imageUrl,
        created_at: now + i,
      };

      boardIdList.push(boardId);
    }

    await set(boardsRef, boardsMap);

    const photoIds = Object.keys(photosMap);
    const savesMap: Record<string, SeedSave> = {};

    for (let i = 0; i < photoIds.length; i += 1) {
      const saveId = push(savesRef).key;
      if (!saveId) {
        throw new Error("Gagal membuat ID save seed");
      }

      const boardId = boardIdList[i % boardIdList.length];
      const boardOwner = boardsMap[boardId].user_id;

      savesMap[saveId] = {
        photo_id: photoIds[i],
        board_id: boardId,
        user_id: boardOwner,
        saved_at: now + i,
      };
    }

    await set(savesRef, savesMap);

    return NextResponse.json({
      message: "Seed refresh selesai",
      users: Object.keys(usersMap).length,
      photos: Object.keys(photosMap).length,
      boards: Object.keys(boardsMap).length,
      saves: Object.keys(savesMap).length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan saat seed refresh";
    return NextResponse.json({ message }, { status: 500 });
  }
}
