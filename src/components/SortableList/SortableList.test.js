/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SortableList from "./SortableList";

const feedList = [
  {
    guid: "111",
    title: "Item A",
    pubDate: "2020-01-01",
    link: "http://item1.local",
    content: "",
    description: "",
  },
  {
    guid: "222",
    title: "Item B",
    pubDate: "2020-01-02",
    link: "http://item2.local",
    content: "",
    description: "",
  },
  {
    guid: "333",
    title: "Item C",
    pubDate: "2020-01-03",
    link: "http://item3.local",
    content: "",
    description: "",
  },
];

it("should render empty list", () => {
  render(<SortableList title="Feed Title" feed={[]} />);
  expect(screen.getByText("Feed Title")).toBeTruthy();
  expect(screen.getByRole("list").children).toHaveLength(0);
});

it("should render feed list", () => {
  render(<SortableList title="Feed Title" feed={feedList} />);
  expect(screen.getByText("Item A")).toBeTruthy();
  expect(screen.getByRole("list").children).toHaveLength(3);
});

it("should render modal on item click", () => {
  render(<SortableList title="Feed Title" feed={feedList} />);
  expect(screen.queryByRole("alertdialog")).toBeNull();
  fireEvent.click(screen.getByText("Item A"));
  expect(screen.getByRole("alertdialog")).toBeTruthy();
});