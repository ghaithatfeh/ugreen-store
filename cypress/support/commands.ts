
/// <reference types="cypress" />

import { supabase } from "../../src/integrations/supabase/client";

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/admin/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
  });
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}
