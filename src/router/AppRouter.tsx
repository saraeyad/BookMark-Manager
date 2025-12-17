import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { routes } from "./routes";

function AppRoutes() {
  return useRoutes(routes);
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
