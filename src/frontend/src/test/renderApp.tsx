import { renderPage } from "@/test/renderPage";

/**
 * Renders the full app (landing page at "/" with the shared Layout providing
 * the navbar and sidebar) using a fresh, isolated memory-history router. This
 * mirrors the production App component's route tree but avoids the module-level
 * singleton router, whose browser-history state leaks across tests and whose
 * async initial load renders an empty tree on the first call.
 */
export async function renderApp() {
  return renderPage("/");
}
