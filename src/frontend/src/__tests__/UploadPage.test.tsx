import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderPage } from "@/test/renderPage";

async function openUpload() {
  await renderPage("/upload");
  await screen.findByRole("heading", { name: "Upload Document" });
}

describe("UploadPage", () => {
  it("renders a drag & drop area and supported document types", async () => {
    await openUpload();

    expect(screen.getByText(/Drag & drop your document/i)).toBeInTheDocument();
    expect(screen.getByTestId("dropzone")).toBeInTheDocument();

    // Supported document types are listed.
    expect(screen.getByText("Aadhaar")).toBeInTheDocument();
    expect(screen.getByText("PAN")).toBeInTheDocument();
    expect(screen.getByText("Passport")).toBeInTheDocument();
    expect(screen.getByText("Driving License")).toBeInTheDocument();
    expect(screen.getByText("Voter ID")).toBeInTheDocument();
  });

  it("shows a file preview after selecting a file", async () => {
    const user = userEvent.setup();
    await openUpload();

    const file = new File(["dummy"], "passport.png", { type: "image/png" });
    const input = screen.getByTestId("file_input");
    await user.upload(input, file);

    expect(screen.getByTestId("file_name")).toHaveTextContent("passport.png");
    expect(screen.getByText(/PNG/)).toBeInTheDocument();
    // The dropzone is replaced by the preview.
    expect(screen.queryByTestId("dropzone")).not.toBeInTheDocument();
  });

  it("starts a fake progress animation when verification begins", async () => {
    const user = userEvent.setup();
    await openUpload();

    const file = new File(["dummy"], "id.pdf", { type: "application/pdf" });
    await user.upload(screen.getByTestId("file_input"), file);

    // The navbar also renders an "upload_button" (New Verification), so target
    // the page's own "Start verification" button by its accessible name.
    await user.click(
      screen.getByRole("button", { name: /Start verification/i }),
    );
    expect(
      screen.getByText(/Uploading & analyzing document/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("allows removing a selected file to return to the dropzone", async () => {
    const user = userEvent.setup();
    await openUpload();

    const file = new File(["dummy"], "id.pdf", { type: "application/pdf" });
    await user.upload(screen.getByTestId("file_input"), file);
    expect(screen.getByTestId("file_name")).toBeInTheDocument();

    await user.click(screen.getByTestId("remove_file_button"));
    expect(screen.getByTestId("dropzone")).toBeInTheDocument();
  });
});
