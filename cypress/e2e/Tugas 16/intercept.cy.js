describe('OrangeHRM Login - Intercept', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      { timeout: 120000 }
    )

    cy.get('input[name="username"]', { timeout: 20000 })
      .should('be.visible')
  })

  it('TC-001 Login berhasil', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboard')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('TC-002 Login password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-003 Login username salah', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidUser')

    cy.get('input[name="username"]').type('AdminSalah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-004 Forgot Password', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPassword')

    cy.contains('Forgot your password?').click()

    cy.url().should('include', 'requestPasswordResetCode')
  })

  it('TC-005 Login tanpa username', () => {
    cy.intercept('GET', '**/auth/login').as('loginPage')

    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

})