/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import { useFetch } from "./hooks/useFetch";
import App from "./App";

const useFetchMock = useFetch;
jest.mock("./hooks/useFetch", () => ({ useFetch: jest.fn() }));

it("should render error", () => {
  useFetchMock.mockReturnValue({ response: null, error: "Custom error", isLoading: false });
  render(<App />);
  expect(screen.getByText("Custom error")).toBeTruthy();
});

it("should render feed list", () => {
  useFetchMock.mockReturnValue({
    feed: { title: "Feed Title" },
    items: [
      { guid: "111", title: "Item 1", pubDate: "2020-01-01" },
      { guid: "222", title: "Item 2", pubDate: "2020-01-02" },
    ],
  });
  render(<App />);
  expect(screen.getByText("Feed Title")).toBeTruthy();
  expect(screen.getByText("Item 1")).toBeTruthy();
  expect(screen.getByRole("list")?.children).toHaveLength(2);
});