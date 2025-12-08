import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Movie } from "./movieData";

export async function fetchAllMovies(): Promise<Movie[]> {
  const moviesCollection = collection(db, "movies");
  const snapshot = await getDocs(moviesCollection);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Movie, "id">),
  }));
}
