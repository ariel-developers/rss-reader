import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";

jest.mock("../../utils/feedHistory", () => ({
  getHistory() {
    return [
      { title: "Suggestion 1", url: "http://suggestion1.local" },
      { title: "Suggestion 2", url: "http://suggestion2.local" },
      { title: "Suggestion 3", url: "http://suggestion3.local" },
    ];
  },
}));

const onSubmit = jest.fn();

it("should render input", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  expect(input).toBeTruthy();
});

it("should render suggestions", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  fireEvent.focus(input);
  expect(screen.getByText("Suggestion 1")).toBeTruthy();
  expect(screen.getByText("http://suggestion3.local")).toBeTruthy();
});

it("should hide suggestions on blur", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  fireEvent.focus(input);
  expect(screen.getByText("Suggestion 1")).toBeTruthy();
  fireEvent.blur(input);
  expect(screen.queryByText("Suggestion 1")).toBeNull();
});

it("should filter suggestions", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  fireEvent.focus(input);
  expect(screen.getByText("Suggestion 1")).toBeTruthy();
  fireEvent.change(input, { target: { value: "suggestion2" } });
  expect(screen.queryByText("Suggestion 1")).toBeNull();
  expect(screen.getByText("Suggestion 2")).toBeTruthy();
  expect(screen.queryByText("Suggestion 3")).toBeNull();
});

it("should do nothing on enter with invalid value", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  fireEvent.change(input, { target: { value: "test.local" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(onSubmit).not.toBeCalled();
});

it("should submit clicked suggestion", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  fireEvent.focus(input);
  const suggestion = screen.getByText("Suggestion 1");
  fireEvent.mouseDown(suggestion);
  expect(onSubmit).toBeCalledWith("http://suggestion1.local");
});

it("should submit selected suggestion", () => {
  render(<SearchInput onSubmit={onSubmit} />);
  const input = screen.getByTitle("RSS URL");
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "ArrowUp" });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(onSubmit).toBeCalledWith("http://suggestion2.local");
});