import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "@/test/renderPage";

async function openVerification() {
  await renderPage("/verify/vs-1001");
  await screen.findByRole("heading", { name: "Aadhaar Verification" });
}

describe("VerificationResultPage", () => {
  it("renders status, confidence score, and result ID", async () => {
    await openVerification();

    // Status badge. "Verified" also appears in the document preview and the
    // submitted/verified grid, so assert at least one occurrence.
    expect(screen.getAllByText("Verified").length).toBeGreaterThan(0);
    // Confidence gauge.
    const gauge = screen.getByTestId("confidence_gauge");
    expect(gauge).toHaveAttribute(
      "aria-label",
      "Confidence score 98.4 percent",
    );
    // Result ID.
    expect(screen.getByText("vs-1001")).toBeInTheDocument();
  });

  it("renders extracted information with per-field confidence", async () => {
    await openVerification();

    expect(
      screen.getByRole("heading", { name: "Extracted Information" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    // "Ananya Sharma" also appears in the document preview, so scope the value
    // assertion to the "Full Name" extracted-field row.
    expect(
      within(screen.getByTestId("extracted_field.1")).getByText(
        "Ananya Sharma",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Date of Birth")).toBeInTheDocument();
  });

  it("renders AI analysis cards", async () => {
    await openVerification();

    const section = screen.getByTestId("ai_analysis_section");
    expect(
      within(section).getByRole("heading", { name: "AI Analysis" }),
    ).toBeInTheDocument();
    expect(
      within(section).getByText("Document Authenticity"),
    ).toBeInTheDocument();
    expect(within(section).getByText("Face Match")).toBeInTheDocument();
    expect(within(section).getByText("Tamper Detection")).toBeInTheDocument();
    expect(within(section).getByText("Data Consistency")).toBeInTheDocument();
  });

  it("renders risk indicators with severity", async () => {
    await openVerification();

    expect(
      screen.getByRole("heading", { name: "Risk Indicators" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Hologram pattern")).toBeInTheDocument();
    expect(screen.getByText("Font consistency")).toBeInTheDocument();
  });

  it("provides a back-to-dashboard link", async () => {
    await openVerification();
    expect(
      screen.getByRole("link", { name: /Back to Dashboard/i }),
    ).toBeInTheDocument();
  });
});
