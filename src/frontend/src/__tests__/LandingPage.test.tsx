import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderApp } from "@/test/renderApp";

describe("LandingPage", () => {
  it("renders the hero with primary and secondary CTAs", async () => {
    await renderApp();
    expect(
      screen.getByRole("heading", {
        name: /AI-Powered Identity & Document Verification/i,
      }),
    ).toBeInTheDocument();
    // "Start a verification" appears in both the hero and the CTA section, so
    // assert at least one occurrence.
    expect(
      screen.getAllByRole("link", { name: /Start a verification/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /View dashboard/i }),
    ).toBeInTheDocument();
  });

  it("renders the features section", async () => {
    await renderApp();
    expect(screen.getByTestId("features_section")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Everything you need to trust every document/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("AI Document Screening")).toBeInTheDocument();
    expect(screen.getByText("Confidence Scoring")).toBeInTheDocument();
    expect(screen.getByText("Multi-Document Support")).toBeInTheDocument();
  });

  it("renders the how-it-works section", async () => {
    await renderApp();
    expect(screen.getByTestId("how_it_works_section")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Verify in three simple steps/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Upload a document")).toBeInTheDocument();
    expect(screen.getByText("AI analyzes authenticity")).toBeInTheDocument();
    expect(screen.getByText("Get a verified result")).toBeInTheDocument();
  });

  it("renders the CTA section and footer", async () => {
    await renderApp();
    expect(screen.getByTestId("cta_section")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Start screening documents with confidence/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("VeriScan")).toBeInTheDocument();
  });
});
