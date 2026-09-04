import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderPage } from "@/test/renderPage";

async function openDashboard() {
  await renderPage("/dashboard");
  await screen.findByRole("heading", { name: "Dashboard" });
}

describe("DashboardPage", () => {
  it("shows a loading skeleton then renders statistics cards", async () => {
    await openDashboard();

    // Loading skeleton is shown initially.
    expect(screen.getByTestId("stats_skeleton")).toBeInTheDocument();

    // After loading, the stats section appears with the four cards.
    const stats = await screen.findByTestId("stats_section");
    expect(within(stats).getByText("Total Verifications")).toBeInTheDocument();
    expect(within(stats).getByText("Verified")).toBeInTheDocument();
    expect(within(stats).getByText("Suspicious")).toBeInTheDocument();
    expect(within(stats).getByText("Fake")).toBeInTheDocument();
  });

  it("renders recent documents from mock data", async () => {
    await openDashboard();

    const table = await screen.findByTestId("recent_table");
    expect(within(table).getByText("Ananya Sharma")).toBeInTheDocument();
    expect(within(table).getByText("Rohan Mehta")).toBeInTheDocument();
    // "Aadhaar" appears in more than one recent row, so assert at least one.
    expect(within(table).getAllByText("Aadhaar").length).toBeGreaterThan(0);
  });

  it("provides an upload button linking to the upload page", async () => {
    const user = userEvent.setup();
    await openDashboard();

    // The navbar also renders an "upload_button" (New Verification), so target
    // the dashboard's own "Upload Document" link by its accessible name.
    const uploadButton = screen.getByRole("link", { name: "Upload Document" });
    expect(uploadButton).toHaveTextContent("Upload Document");
    await user.click(uploadButton);
    expect(
      await screen.findByRole("heading", { name: "Upload Document" }),
    ).toBeInTheDocument();
  });

  it("links each recent document to its verification result", async () => {
    const user = userEvent.setup();
    await openDashboard();

    const table = await screen.findByTestId("recent_table");
    const firstRow = within(table).getByTestId("recent_row.1");
    await user.click(
      within(firstRow).getByRole("link", {
        name: /View details for Aadhaar of Ananya Sharma/i,
      }),
    );
    expect(
      await screen.findByRole("heading", { name: "Aadhaar Verification" }),
    ).toBeInTheDocument();
  });
});
