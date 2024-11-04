describe("Account Settings Functionality", () => {
  beforeEach(function () {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.fixture("user").then((users) => {
      cy.wrap(users.userWithEmptySession).as("user");
    });
    cy.visit("settings?tab=account");
  });

  it("should render the settings page with correct values", function () {
    cy.dataCy("account-settings-title").should("contain", "Account");
    cy.dataCy("email").should("contain", `Email: ${this.user.email}`);
    cy.dataCy("username").should("have.value", this.user.username);
  });

  it("should update the username", () => {
    cy.dataCy("username").clear().type("newUsername");
    cy.dataCy("submit").click();
    cy.dataCy("username").should("have.value", "newUsername");
  });

  it("should have correctly functioning submit button", function () {
    cy.dataCy("submit").should("be.disabled");
    cy.dataCy("password").type("password123");
    cy.dataCy("rePassword").type("something");
    cy.dataCy("submit").should("be.disabled");
    cy.dataCy("rePassword").clear().type("password123");
    cy.dataCy("submit").should("not.be.disabled");
    cy.dataCy("password").clear();
    cy.dataCy("rePassword").clear();
    cy.dataCy("submit").should("be.disabled");
    cy.dataCy("username").clear().type("newUsername");
    cy.dataCy("submit").should("not.be.disabled");
    cy.dataCy("username").clear().type(this.user.username);
    cy.dataCy("submit").should("be.disabled");
  });

  it("should show warning before deleting account", () => {
    cy.dataCy("delete-account").click();
    cy.dataCy("warning-modal-header")
      .invoke("text")
      .should("match", /Are you sure\?/i);
    cy.dataCy("confirm-delete").should("be.visible");
    cy.dataCy("cancel-delete").click();
    cy.dataCy("warning-modal-header").should("not.exist");
  });

  it("should delete account", () => {
    cy.dataCy("delete-account").click();
    cy.dataCy("confirm-delete").click();
    cy.url().should("include", "/signup");
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.be.null;
    });
  });
});
