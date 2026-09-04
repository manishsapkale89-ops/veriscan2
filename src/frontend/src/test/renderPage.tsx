import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";

import { Layout } from "@/components/Layout";
import { DashboardPage } from "@/pages/DashboardPage";
import { LandingPage } from "@/pages/LandingPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { UploadPage } from "@/pages/UploadPage";
import { VerificationResultPage } from "@/pages/VerificationResultPage";

/**
 * Renders a single page in isolation using a memory-history router. This
 * mirrors the route tree defined in App.tsx but uses memory history so each
 * call gets a fresh, fully isolated router instance (the production router is
 * a module-level singleton whose state leaks across tests).
 */
export async function renderPage(initialPath: string) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Outlet />
      </>
    ),
  });

  const landingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: LandingPage,
  });

  const appLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "app-layout",
    component: Layout,
  });

  const dashboardRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/dashboard",
    component: DashboardPage,
  });

  const uploadRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/upload",
    component: UploadPage,
  });

  const verifyRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/verify/$id",
    component: VerificationResultPage,
  });

  const reportsRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/reports",
    component: ReportsPage,
  });

  const settingsRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/settings",
    component: SettingsPage,
  });

  const routeTree = rootRoute.addChildren([
    landingRoute,
    appLayoutRoute.addChildren([
      dashboardRoute,
      uploadRoute,
      verifyRoute,
      reportsRoute,
      settingsRoute,
    ]),
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });

  // The router's initial load is asynchronous; await it so the page content is
  // present immediately after render (rather than on a later tick).
  await router.load();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
