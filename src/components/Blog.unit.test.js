import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Blog from "./Blog";

describe("displaying a blog", () => {
  let container;
  const blog = {
    title: "This is a new blog",
    author: "John Wick",
    url: "https://google.com",
    likes: 20,
    user: {
      username: "test_user",
    },
  };
  const user = {
    username: "test_user",
  };
  const likeBlogHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} likeBlog={likeBlogHandler} />
    ).container;
  });

  test("render title, but not author, url and likes by default", () => {
    const author = container.querySelector("#blog-author");
    const url = container.querySelector("#blog-url");
    const likes = container.querySelector("#blog-likes");

    screen.getByText("This is a new blog");
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("shows author, url and like on view button clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    screen.getByText("This is a new blog");
    screen.getByText("John Wick");
    screen.getByText("https://google.com");
    screen.getByText("20", { exact: false });
  });

  test("clicking like button twice trigger event function twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeBlogHandler.mock.calls).toHaveLength(2);
  });
});
