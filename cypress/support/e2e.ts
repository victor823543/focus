import "./commands";

beforeEach(() => {
  // This will run before every test in every spec file
  cy.request("POST", "http://localhost:4000/api/test/reset-db")
    .its("status")
    .should("eq", 204);

  // Seed the database with global categories
  cy.fixture("categories").then((categories: any) => {
    cy.request("POST", "http://localhost:4000/api/test/seed-db", {
      globalCategories: categories,
    })
      .its("status")
      .should("eq", 204);
  });
});
