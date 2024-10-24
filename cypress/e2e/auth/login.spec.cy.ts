describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("should log in successfully with valid credentials", () => {
    cy.fixture("user").then((testUser) => {
      cy.dataCy("email").type(testUser.email);
      cy.dataCy("password").type(testUser.password);
    });
    cy.dataCy("submit").click();
    cy.window().its("localStorage.token").should("exist");
    cy.url().should("include", "/configuration");
  });

  it("should navigate to the signup page", () => {
    cy.dataCy("link-signup").click();
    cy.url().should("include", "/signup");
  });
});
