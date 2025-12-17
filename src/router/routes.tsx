import { Navigate, RouteObject } from "react-router-dom";
import { LoginPage, SignupPage } from "@/views/auth";
import { BookmarksPage } from "@/views/bookmarks";
import { ErrorPage } from "@/views/error";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "@/constants";

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES.BOOKMARKS,
    element: (
      <ProtectedRoute>
        <BookmarksPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.BOOKMARKS_ARCHIVE,
    element: (
      <ProtectedRoute>
        <BookmarksPage isArchive={true} />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

