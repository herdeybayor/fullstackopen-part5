describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Sherifdeen Adebayo",
      username: "herdeybayor",
      password: "test",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("herdeybayor");
      cy.get("#password").type("test");
      cy.get("button").click();

      cy.contains("Sherifdeen Adebayo logged in").contains("logout");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("hello");
      cy.get("#password").type("world");
      cy.get("#login-button").click();

      cy.get(".notification")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")
        .and("have.css", "border-width", "3px")
        .and("have.css", "position", "fixed");

      cy.get("html").should("not.contain", "Sherifdeen Adebayo logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "herdeybayor", password: "test" });
    });

    it("A blog can be created", function () {
      cy.get("#new-blog").click();

      cy.get("#title").type("new blog title");
      cy.get("#author").type("the author");
      cy.get("#url").type("https://google.com");

      cy.get("#createBlog").click();

      cy.contains("new blog title");
    });

    describe("and multiple blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "an existing blog",
          author: "Elon Musk",
          url: "https://twitter.com",
        });
        cy.createBlog({
          title: "another blog",
          author: "Elon Musk",
          url: "https://twitter.com",
        });
        cy.createBlog({
          title: "yet another blog",
          author: "Elon Musk",
          url: "https://twitter.com",
        });
      });

      it("a user can like blog", function () {
        cy.contains("another blog").contains("view").as("viewButton");
        cy.get("@viewButton").click();

        cy.get("@viewButton")
          .parent()
          .parent()
          .contains("like")
          .as("likeButton");
        cy.get("@likeButton").click();

        cy.get("#blog-likes").contains("likes 1");
      });

      describe("deleting a blog", function () {
        it("succeeds if creator clicks remove button", function () {
          cy.contains("yet another blog").contains("view").as("viewButton");
          cy.get("@viewButton").click();

          cy.get("@viewButton")
            .parent()
            .parent()
            .contains("remove")
            .as("removeButton");
          cy.get("@removeButton").click();
        });

        it("should not be possible if trying to delete another user's blog", function () {
          cy.contains("logout").click();
          cy.createUser({
            name: "Elon Musk",
            username: "musk",
            password: "test",
          });

          cy.login({ username: "musk", password: "test" });

          cy.contains("an existing blog").contains("view").as("viewButton");
          cy.get("@viewButton").click();

          cy.get("@viewButton")
            .parent()
            .parent()
            .should("not.contain", "remove");
        });
      });

      it.only("blogs are ordered by likes", async function () {
        cy.get("html");
        cy.likeBlog("another blog");
        cy.likeBlog("yet another blog");
        cy.likeBlog("another blog");
        cy.likeBlog("an existing blog");
        cy.likeBlog("yet another blog");
        cy.likeBlog("another blog");
        cy.get(".blog");
        cy.get(".blog").each(() => {
          cy.contains("view").as("viewButton");
          cy.get("@viewButton").click();
        });

        cy.get(".blog").eq(2).should("contain", "likes 1");
        cy.get(".blog").eq(0).should("contain", "likes 5");
        cy.get(".blog").eq(1).should("contain", "likes 2");
      });
    });
  });
});
