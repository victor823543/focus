describe("Account Settings Functionality", () => {
  beforeEach(() => {
    cy.loginWithSession();
    cy.visit("settings?tab=account");
  });

  it("should render the settings page with correct values", () => {
    cy.dataCy("account-settings-title").should("contain", "Account");
    cy.fixture("user").then((testUser) => {
      cy.dataCy("email").should("contain", `Email: ${testUser.email}`);
      cy.dataCy("username").should("have.value", testUser.username);
    });
  });

  it("should update the username", () => {
    cy.dataCy("username").clear().type("newUsername");
    cy.dataCy("submit").click();
    cy.dataCy("username").should("have.value", "newUsername");
  });

  it("should have correctly functioning submit button", () => {
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
    cy.fixture("user").then((testUser) => {
      cy.dataCy("username").clear().type(testUser.username);
      cy.dataCy("submit").should("be.disabled");
    });
  });

  it("should show warning before deleting account", () => {
    cy.dataCy("delete-account").click();
    cy.dataCy("warning-modal-header").should("contain", "Are you sure?");
    cy.dataCy("confirm-delete").should("be.visible");
    cy.dataCy("cancel-delete").click();
    cy.dataCy("warning-modal-header").should("not.exist");
  });
});
