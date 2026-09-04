import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderApp } from "@/test/renderApp";

async function openReports(user: ReturnType<typeof userEvent.setup>) {
  await renderApp();
  await user.click(screen.getByRole("link", { name: /View dashboard/i }));
  await user.click(screen.getByRole("link", { name: "Reports" }));
  await screen.findByRole("heading", { name: "Reports" });
}

describe("ReportsPage", () => {
  it("renders the full table of mock verifications", async () => {
    const user = userEvent.setup();
    await openReports(user);

    expect(screen.getByText("Ananya Sharma")).toBeInTheDocument();
    expect(screen.getByText("Rohan Mehta")).toBeInTheDocument();
    expect(screen.getByText("Priya Nair")).toBeInTheDocument();
    // Summary shows all 8 records.
    expect(screen.getByText(/Showing/)).toHaveTextContent("8");
  });

  it("filters rows by search query", async () => {
    const user = userEvent.setup();
    await openReports(user);

    await user.type(screen.getByTestId("search_input"), "Priya");
    expect(screen.getByText("Priya Nair")).toBeInTheDocument();
    expect(screen.queryByText("Ananya Sharma")).not.toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toHaveTextContent("1");
  });

  it("filters rows by status", async () => {
    const user = userEvent.setup();
    await openReports(user);

    await user.click(screen.getByTestId("status_filter"));
    await user.click(await screen.findByRole("option", { name: "Fake" }));

    expect(screen.getByText("Arjun Reddy")).toBeInTheDocument();
    expect(screen.getByText("Manish Gupta")).toBeInTheDocument();
    expect(screen.queryByText("Ananya Sharma")).not.toBeInTheDocument();
  }, 20000);

  it("shows an empty state when no rows match and clears filters", async () => {
    const user = userEvent.setup();
    await openReports(user);

    await user.type(screen.getByTestId("search_input"), "zzz-no-match");
    expect(screen.getByTestId("empty_state")).toBeInTheDocument();
    // "No verifications found" is rendered as a paragraph, not a heading.
    expect(screen.getByText("No verifications found")).toBeInTheDocument();

    await user.click(screen.getByTestId("empty_state_action"));
    expect(screen.queryByTestId("empty_state")).not.toBeInTheDocument();
    expect(screen.getByText("Ananya Sharma")).toBeInTheDocument();
  });

  it("renders an export button", async () => {
    const user = userEvent.setup();
    await openReports(user);
    expect(screen.getByTestId("export_button")).toHaveTextContent(
      "Export report",
    );
  });
});
