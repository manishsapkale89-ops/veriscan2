import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderApp } from "@/test/renderApp";

async function openReports(user: ReturnType<typeof userEvent.setup>) {
  await renderApp();
  await user.click(screen.getByRole("link", { name: /View dashboard/i }));
  await user.click(screen.getByRole("link", { name: "Reports" }));
  await screen.findByRole("heading", { name: "Reports" });
}

describe("ReportsPage status filter", () => {
  it("renders the expected status options in the dropdown", async () => {
    const user = userEvent.setup();
    await openReports(user);

    await user.click(screen.getByTestId("status_filter"));

    expect(
      await screen.findByRole("option", { name: "All statuses" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Verified" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Suspicious" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Fake" })).toBeInTheDocument();
  }, 20000);
});
