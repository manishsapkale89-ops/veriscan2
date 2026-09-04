import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";
import { beforeEach } from "vitest";

// Generated components use data-ocid attributes for test hooks.
configure({ testIdAttribute: "data-ocid" });

// The app router uses browser history, which persists across tests in the same
// file. Reset to the landing route before each test so navigation tests start
// from a known state.
beforeEach(() => {
  window.history.pushState({}, "", "/");
});

// jsdom does not implement IntersectionObserver, which framer-motion's
// whileInView animations require. Provide a no-op stub so motion components
// render without throwing.
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}

// jsdom does not implement pointer capture, which Radix UI Select relies on
// when opening its dropdown. Provide no-op stubs so the select opens and its
// options become queryable.
if (typeof Element.prototype.hasPointerCapture !== "function") {
  Element.prototype.hasPointerCapture = () => false;
}
if (typeof Element.prototype.setPointerCapture !== "function") {
  Element.prototype.setPointerCapture = () => {};
}
if (typeof Element.prototype.releasePointerCapture !== "function") {
  Element.prototype.releasePointerCapture = () => {};
}
// jsdom does not implement scrollIntoView, which Radix UI Select calls on the
// highlighted option when its dropdown opens.
if (typeof Element.prototype.scrollIntoView !== "function") {
  Element.prototype.scrollIntoView = () => {};
}
