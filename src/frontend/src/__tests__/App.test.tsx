import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderPage } from "@/test/renderPage";

describe("App routing and navigation", () => {
  it("loads the landing page on the default route without a blank screen", async () => {
    await renderPage("/");
    expect(
      await screen.findByRole("heading", {
        name: /AI-Powered Identity & Document Verification/i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates to every app page via the sidebar with active highlighting", async () => {
    const user = userEvent.setup();
    await renderPage("/");

    // Wait for the landing page to render, then go to the dashboard.
    await screen.findByRole("heading", {
      name: /AI-Powered Identity & Document Verification/i,
    });
    await user.click(screen.getByRole("link", { name: /View dashboard/i }));
    expect(
      await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();

    // Sidebar nav links are present.
    const sidebar = screen.getByTestId("sidebar");
    const nav = within(sidebar).getByTestId("sidebar_nav");

    // Dashboard should be active.
    const dashboardLink = within(nav).getByRole("link", { name: "Dashboard" });
    expect(dashboardLink.className).toContain("bg-brand-gradient");

    // Navigate to Upload.
    await user.click(within(nav).getByRole("link", { name: "Upload" }));
    expect(
      await screen.findByRole("heading", { name: "Upload Document" }),
    ).toBeInTheDocument();

    // Navigate to Reports.
    await user.click(within(nav).getByRole("link", { name: "Reports" }));
    expect(
      await screen.findByRole("heading", { name: "Reports" }),
    ).toBeInTheDocument();

    // Navigate to Settings.
    await user.click(within(nav).getByRole("link", { name: "Settings" }));
    expect(
      await screen.findByRole("heading", { name: "Settings" }),
    ).toBeInTheDocument();

    // Navigate to Verification result.
    await user.click(within(nav).getByRole("link", { name: "Verification" }));
    expect(
      await screen.findByRole("heading", {
        name: "Aadhaar Verification",
      }),
    ).toBeInTheDocument();

    // Active state follows the current route.
    const reportsLink = within(nav).getByRole("link", { name: "Reports" });
    expect(reportsLink.className).not.toContain("bg-brand-gradient");
  });

  it("navigates to the upload page from the navbar New Verification button", async () => {
    const user = userEvent.setup();
    await renderPage("/dashboard");

    // Wait for the dashboard to render (the navbar is present on app pages).
    await screen.findByRole("heading", { name: "Dashboard" });
    await user.click(screen.getByRole("link", { name: "New Verification" }));
    expect(
      await screen.findByRole("heading", { name: "Upload Document" }),
    ).toBeInTheDocument();
  });
});
