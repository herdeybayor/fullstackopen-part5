import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import BlogForm from "./BlogForm";

test("creating a blog", async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm addBlog={addBlog} />);
  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");
  const createButton = container.querySelector("[type='submit']");

  await user.type(title, "blog title");
  await user.type(author, "blog author");
  await user.type(url, "blog url");
  await user.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: "blog title",
    author: "blog author",
    url: "blog url",
  });
}, 100000);
