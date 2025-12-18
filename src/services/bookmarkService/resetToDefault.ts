import { storage } from "@/utils/storage";
import { STORAGE_KEY } from "./constants";
import bookmarksData from "../../../data.json";


export function resetToDefault(): void {
  storage.setItem(STORAGE_KEY, bookmarksData.bookmarks);
}

