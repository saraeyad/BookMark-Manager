// Import all bookmark service functions
import { getBookmarks } from "./getBookmarks";
import { getTags } from "./getTags";
import { createBookmark } from "./createBookmark";
import { updateBookmark } from "./updateBookmark";
import { deleteBookmark } from "./deleteBookmark";
import { togglePinBookmark } from "./togglePinBookmark";
import { toggleArchiveBookmark } from "./toggleArchiveBookmark";
import { visitBookmark } from "./visitBookmark";
import { getBookmark } from "./getBookmark";
import { resetToDefault } from "./resetToDefault";

// Compose all functions into the bookmarkService object
export const bookmarkService = {
  getBookmarks,
  getTags,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  togglePinBookmark,
  toggleArchiveBookmark,
  visitBookmark,
  getBookmark,
  resetToDefault,
};

