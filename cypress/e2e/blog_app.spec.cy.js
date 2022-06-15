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

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "an existing blog",
          author: "Elon Musk",
          url: "https://twitter.com",
        });
      });

      it.only("a user can like blog", function () {
        cy.contains("an existing blog")
          .contains("view")
          .as("viewButton")
          .click();

        cy.get("#blog-likes").contains("like").as("likeButton");
        cy.get("@likeButton").click();

        cy.get("#blog-likes").contains("likes 1");
      });
    });
  });
});
