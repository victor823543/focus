describe("Signup Functionality", () => {
  beforeEach(function () {
    cy.visit("signup");
    cy.fixture("user").then((users) => {
      cy.wrap(users.basicUser).as("user");
    });
  });
  const signup = (email: any, password: any, username: any) => {
    cy.dataCy("email").type(email);
    cy.dataCy("password").type(password);
    cy.dataCy("username").type(username);
    cy.dataCy("submit").click();
  };

  it("should sign up successfully with valid credentials and navigate to configuration", function () {
    signup(this.user.email, this.user.password, this.user.username);
    cy.window().its("localStorage.token").should("exist");
    cy.url().should("include", "/configuration");
  });

  it("should navigate to the login page", () => {
    cy.dataCy("link-login").click();
    cy.url().should("include", "/login");
  });

  it("should not submit the form with invalid fields and show errors", () => {
    cy.dataCy("submit").click();
    cy.dataCy("form-error").should("have.length", 3);
    cy.reload();
    signup("invalidemail", "validpassword123", "validusername");
    cy.dataCy("form-error").should("have.length", 1);
    cy.reload();
    signup("valid@email.com", "invalid", "validusername");
    cy.dataCy("form-error").should("have.length", 1);
    cy.reload();
    signup("invalidemail", "invalid", "validusername");
    cy.dataCy("form-error").should("have.length", 2);
  });
});
