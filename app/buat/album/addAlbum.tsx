import { app } from "@/firebaseConfig";
import { getDatabase, push, ref } from "firebase/database";

interface AlbumData {
    
  }

export const addAlbum = async (albumData: AlbumData) => {
  // Get a reference to the database
  const db = getDatabase(app);
  // Get a reference to the location where you want to add the data
  const AlbumsRef = ref(db, "Albums");

  try {
    const newAlbumRef = await push(AlbumsRef, albumData);
    // Get the ID of the newly added report
    const albumId = newAlbumRef.key;

    console.log("Add report successfully with ID:", albumId);

    // Return the report ID
    return albumId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
