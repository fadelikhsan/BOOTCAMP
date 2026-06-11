class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username)
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click()
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard')
  }

  verifyInvalidCredentials() {
    cy.contains('Invalid credentials').should('be.visible')
  }

  verifyRequired() {
    cy.contains('Required').should('be.visible')
  }
}

export default LoginPage