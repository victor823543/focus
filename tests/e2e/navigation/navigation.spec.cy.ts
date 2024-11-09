describe("Navigation Functionality", () => {
  it("should navigate to various pages by clicking on the sidebar links if logged in", () => {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.visit("dashboard");
    cy.dataCy("sidebar-link")
      .contains(/settings/i)
      .closest('[data-cy="sidebar-link"]')
      .click();
    cy.url().should("include", "/settings?tab=account");
    cy.dataCy("sidebar-link")
      .contains(/dashboard/i)
      .closest('[data-cy="sidebar-link"]')
      .click();
    cy.url().should("include", "/dashboard");
    cy.dataCy("sidebar-link")
      .contains(/categories/i)
      .closest('[data-cy="sidebar-link"]')
      .click();
    cy.url().should("include", "/categories");
  });

  it("should restrict access to various pages if not logged in and redirect to login", () => {
    cy.visit("dashboard");
    cy.url().should("include", "/login");
    cy.visit("settings?tab=account");
    cy.url().should("include", "/login");
    cy.visit("calendar");
    cy.url().should("include", "/login");
    cy.visit("categories");
    cy.url().should("include", "/login");
  });

  it("should restrict access to various pages if no session exists and redirect to configuration", () => {
    cy.seedBasicUser();
    cy.login();
    cy.visit("dashboard");
    cy.url().should("include", "/configuration");
    cy.visit("settings?tab=account");
    cy.url().should("include", "/configuration");
    cy.visit("calendar");
    cy.url().should("include", "/configuration");
    cy.visit("categories");
    cy.url().should("include", "/configuration");
  });

  it("should navigate categories page by breadcrumbs", () => {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.visit("categories");
    cy.fixture("dbSeedWithEmptySession").then((data) => {
      cy.contains(data.categories[0].name).click();
    });
    cy.dataCy("breadcrumb-2").should("contain", "Category");
    cy.dataCy("breadcrumb-1").click();
    cy.dataCy("breadcrumb-2").should("not.exist");
    cy.dataCy("link-home").click();
    cy.url().should("include", "/dashboard");
  });

  it("should navigate to different views by clicking on the tabs in calendar page", () => {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.visit("calendar");
    cy.url().should("include", "/calendar?tab=month");
    cy.dataCy("tab-week").click();
    cy.url().should("include", "/calendar?tab=week");
    cy.dataCy("tab-day").click();
    cy.url().should("include", "/calendar?tab=day");
  });

  it("should navigate to different views by clicking on the tabs in settings page", () => {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.visit("settings");
    cy.url().should("include", "/settings?tab=account");
    cy.dataCy("tab-session").click();
    cy.url().should("include", "/settings?tab=session");
    cy.dataCy("tab-account").click();
    cy.url().should("include", "/settings?tab=account");
  });
});
