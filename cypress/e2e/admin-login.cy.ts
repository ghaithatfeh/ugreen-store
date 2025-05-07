
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Admin Login', () => {
  beforeEach(() => {
    // Visit the admin login page before each test
    cy.visit('/admin/login');
  });

  it('displays the login form properly', () => {
    // Check if the login form is rendered with the correct elements
    cy.get('h3').contains('Admin Login');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
  });

  it('shows error on invalid login', () => {
    // Enter invalid credentials
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Should show an error toast
    cy.contains('Login failed').should('be.visible');
  });

  it('navigates back to store', () => {
    // Click on "Back to Store" button
    cy.get('button').contains('Back to Store').click();
    
    // Should redirect to the home page
    cy.url().should('eq', 'http://localhost:8080/');
  });

  // This test requires a valid admin account and will need to be modified
  // with actual credentials or mocked authentication
  it('redirects to admin dashboard on successful login', () => {
    // Enter valid credentials (replace with actual test credentials)
    cy.get('input[type="email"]').type('a89ghaith@gmail.com');
    cy.get('input[type="password"]').type('123456');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Should redirect to admin dashboard
    cy.url().should('include', '/admin');
    cy.contains('Admin Dashboard').should('be.visible');
    cy.contains('Logout').should('be.visible');
  });
});
