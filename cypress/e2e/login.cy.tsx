// Your E2E tests will be in the cypress/e2e directory or a similar integration test directory.
import React from "react";
import "@testing-library/cypress";

describe("<LoginTemplate /> E2E tests", () => {
  beforeEach(() => {
    // Assuming your login page is served at the root of your site.
    // Adjust the URL if your app has a different entry point for the login page.
    cy.visit("/");
  });

  it("allows the user to log in successfully with correct credentials", () => {
    cy.findByRole("textbox", { name: /usuario/i }).type("admin");
    cy.findByLabelText(/clave/i).type("admin");
    cy.findByRole("button", { name: /login/i }).click();
    // Replace '/home' with the actual path you expect to redirect after login
    cy.url().should("include", "/home");
  });

  it("displays an error alert on failed login", () => {
    cy.findByRole("button", { name: /login/i }).click();
    // Ensure your app displays an error that can be captured by this selector.
    cy.findByRole("heading", { name: /datos incorrectos\./i }).should(
      "be.visible"
    );
  });

  it("toggles password visibility when the visibility icon is clicked", () => {
    cy.findByLabelText(/clave/i).as("passwordField");
    cy.get("@passwordField")
      .type("password")
      .should("have.attr", "type", "password");
    cy.findByTestId("VisibilityOffIcon").click();
    cy.get("@passwordField").should("have.attr", "type", "text");
    cy.findByTestId("VisibilityIcon").click();
    cy.get("@passwordField").should("have.attr", "type", "password");
  });
});
