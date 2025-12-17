import { z } from "zod";

// ************* AUTH USER *************
export interface AuthUserData {
  id: string;
  email: string;
  name: string;
}

// ************* LOGIN *************
export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string(),
});
export type LoginType = z.infer<typeof loginSchema>;

// ************* SIGN UP *************
export const signupSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),
});

export type SignupType = z.infer<typeof signupSchema>;

// ************* BOOKMARK *************

export const bookmarkSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string(),
  url: z.string(),
  favicon: z.string().optional(),
  description: z.string(),
  tags: z.array(z.string()),
  pinned: z.boolean(),
  isArchived: z.boolean(),
  visitCount: z.number(),
  lastVisited: z.string().nullable(),
  createdAt: z.string(),
});

export const bookmarksSchema = z.array(bookmarkSchema);

export type BookmarkType = z.infer<typeof bookmarkSchema>;
export type BookmarksType = z.infer<typeof bookmarksSchema>;

// ************* TAGS *************

export const tagsSchema = z.array(
  z.object({
    count: z.number(),
    name: z.string(),
  })
);
export type TagsType = z.infer<typeof tagsSchema>;

// ************* EDIT BOOKMARK *************

export const addBookmarkSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Can't be empty").max(100),
  description: z.string().trim().min(1, "Can't be empty").max(280),
  website: z.string().url("Invalid URL, must start with https://"),
  tags: z
    .string()
    .regex(/^(\s*\w+\s*)(,\s*\w+\s*)*$/, "Must be comma-separated words"),
});

export type AddBookmarkType = z.infer<typeof addBookmarkSchema>;

