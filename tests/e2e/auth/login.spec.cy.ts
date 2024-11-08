describe("Login Functionality", () => {
  beforeEach(function () {
    cy.visit("login");
    cy.fixture("user").as("users");
  });

  const login = (email: any, password: any) => {
    cy.dataCy("email").type(email);
    cy.dataCy("password").type(password);
    cy.dataCy("submit").click();
  };

  it("should log in successfully with valid credentials and navigate to configuration", function () {
    cy.seedBasicUser();
    login(this.users.basicUser.email, this.users.basicUser.password);
    cy.window().its("localStorage.token").should("exist");
    cy.url().should("include", "/configuration");
  });

  it("should log in and navigate to dashboard with existing session", function () {
    cy.seedUserWithEmptySession();
    login(
      this.users.userWithEmptySession.email,
      this.users.userWithEmptySession.password,
    );
    cy.window().its("localStorage.token").should("exist");
    cy.url().should("include", "/dashboard");
  });

  it("should navigate to the signup page", () => {
    cy.dataCy("link-signup").click();
    cy.url().should("include", "/signup");
  });

  it("should not submit the form with invalid fields and show errors", () => {
    cy.dataCy("submit").click();
    cy.dataCy("form-error").should("have.length", 2);
    cy.reload();
    cy.dataCy("email").type("invalidemail");
    cy.dataCy("password").type("validpassword123");
    cy.dataCy("submit").click();
    cy.dataCy("form-error").should("have.length", 1);
    cy.reload();
    cy.dataCy("email").type("validbutwrong@email.com");
    cy.dataCy("password").type("wrongpassword");
    cy.dataCy("submit").click();
    cy.dataCy("error-alert").should("be.visible");
  });

  it("should log in and out successfully", function () {
    cy.seedUserWithEmptySession();
    login(
      this.users.userWithEmptySession.email,
      this.users.userWithEmptySession.password,
    );
    cy.window().its("localStorage.token").should("exist");
    cy.dataCy("sidebar-link")
      .contains(/log out/i)
      .closest('[data-cy="sidebar-link"]')
      .click();
    cy.window().its("localStorage.token").should("not.exist");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
