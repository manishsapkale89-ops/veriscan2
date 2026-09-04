import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "sonner";
import { describe, expect, it, vi } from "vitest";

import { SkeletonCard, SkeletonTable } from "@/components/ui/LoadingSkeleton";
import { Modal } from "@/components/ui/Modal";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { toastSuccess } from "@/components/ui/Toast";

describe("Modal", () => {
  it("renders title, description, and confirm/cancel when open", () => {
    render(
      <Modal
        open
        onOpenChange={() => {}}
        title="Delete account?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
      >
        <p>Are you sure?</p>
      </Modal>,
    );
    expect(
      screen.getByRole("heading", { name: "Delete account?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This action cannot be undone."),
    ).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByTestId("confirm_button")).toHaveTextContent("Delete");
    expect(screen.getByTestId("cancel_button")).toHaveTextContent("Cancel");
  });

  it("calls onConfirm when the confirm button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <Modal
        open
        onOpenChange={() => {}}
        title="Confirm"
        confirmLabel="Confirm"
        onConfirm={onConfirm}
      />,
    );
    await user.click(screen.getByTestId("confirm_button"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

describe("ProgressBar", () => {
  it("renders the value and label", () => {
    render(<ProgressBar value={75} showLabel label="Confidence" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "75");
    expect(screen.getByText("Confidence")).toBeInTheDocument();
    expect(screen.getByText("75.0%")).toBeInTheDocument();
  });

  it("clamps values outside 0-100", () => {
    render(<ProgressBar value={150} showLabel />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });
});

describe("StatusBadge", () => {
  it("renders the label for each status", () => {
    const { rerender } = render(<StatusBadge status="verified" />);
    expect(screen.getByText("Verified")).toBeInTheDocument();
    rerender(<StatusBadge status="suspicious" />);
    expect(screen.getByText("Suspicious")).toBeInTheDocument();
    rerender(<StatusBadge status="fake" />);
    expect(screen.getByText("Fake")).toBeInTheDocument();
  });
});

describe("LoadingSkeleton", () => {
  it("renders skeleton cards and tables", () => {
    render(
      <div>
        <SkeletonCard />
        <SkeletonTable rows={3} />
      </div>,
    );
    expect(screen.getByTestId("skeleton_card")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton_table")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });
});

describe("Toast", () => {
  it("renders a success toast with message and description", async () => {
    render(<Toaster position="top-right" />);
    toastSuccess("Profile updated", "Your profile has been saved.");
    expect(await screen.findByText("Profile updated")).toBeInTheDocument();
    expect(
      screen.getByText("Your profile has been saved."),
    ).toBeInTheDocument();
  });
});
