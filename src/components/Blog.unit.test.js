import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("displaying a blog render title, but not author, url and likes", () => {
  const blog = {
    title: "This is a new blog",
    author: "John Wick",
    url: "https://google.com",
    likes: 20,
  };

  const { container } = render(<Blog blog={blog} />);

  const title = container.querySelector("#blog-title");
  const author = container.querySelector("#blog-author");
  const url = container.querySelector("#blog-url");
  const likes = container.querySelector("#blog-likes");

  expect(title).toHaveTextContent("This is a new blog");
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});
