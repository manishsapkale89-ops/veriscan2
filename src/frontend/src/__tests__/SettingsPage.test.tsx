import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderApp } from "@/test/renderApp";

async function openSettings(user: ReturnType<typeof userEvent.setup>) {
  await renderApp();
  await user.click(screen.getByRole("link", { name: /View dashboard/i }));
  await user.click(screen.getByRole("link", { name: "Settings" }));
  await screen.findByRole("heading", { name: "Settings" });
}

describe("SettingsPage", () => {
  it("renders the profile section with prefilled values", async () => {
    const user = userEvent.setup();
    await openSettings(user);

    expect(
      screen.getByRole("heading", { name: "Profile" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("profile_name_input")).toHaveValue("Alex Morgan");
    expect(screen.getByTestId("profile_email_input")).toHaveValue(
      "alex.morgan@veriscan.io",
    );
    expect(screen.getByTestId("profile_org_input")).toHaveValue(
      "Northbridge Compliance",
    );
  });

  it("toggles the theme between light and dark", async () => {
    const user = userEvent.setup();
    await openSettings(user);

    const root = document.documentElement;
    // Start in light mode.
    expect(root.classList.contains("dark")).toBe(false);

    await user.click(screen.getByTestId("theme_dark_button"));
    expect(root.classList.contains("dark")).toBe(true);
    expect(screen.getByTestId("theme_dark_button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByTestId("theme_light_button"));
    expect(root.classList.contains("dark")).toBe(false);
    expect(screen.getByTestId("theme_light_button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("toggles notification settings", async () => {
    const user = userEvent.setup();
    await openSettings(user);

    const firstToggle = screen.getByTestId("notification_toggle.1");
    expect(firstToggle).toHaveAttribute("aria-checked", "true");

    await user.click(firstToggle);
    expect(firstToggle).toHaveAttribute("aria-checked", "false");
  });

  it("renders account settings including two-factor toggle", async () => {
    const user = userEvent.setup();
    await openSettings(user);

    expect(
      screen.getByRole("heading", { name: "Account" }),
    ).toBeInTheDocument();
    const twoFactor = screen.getByTestId("two_factor_toggle");
    expect(twoFactor).toHaveAttribute("aria-checked", "true");
  });

  it("opens the delete account modal from the danger zone", async () => {
    const user = userEvent.setup();
    await openSettings(user);

    await user.click(screen.getByTestId("delete_account_button"));
    expect(
      await screen.findByRole("heading", { name: "Delete account?" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("confirm_button")).toHaveTextContent(
      "Delete account",
    );
  });
});
