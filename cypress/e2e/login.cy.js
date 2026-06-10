describe('OrangeHRM Login Test', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      { timeout: 120000 }
    )

    cy.get('input[name="username"]', { timeout: 20000 })
      .should('be.visible')
  })

  it('TC-001 Login dengan username dan password valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url({ timeout: 10000 }).should('include', '/dashboard')
  })

  it('TC-002 Login dengan username valid dan password tidak valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin12')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-003 Login dengan username tidak valid dan password valid', () => {
    cy.get('input[name="username"]').type('Admin123')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-004 Login dengan username dan password tidak valid', () => {
    cy.get('input[name="username"]').type('test')
    cy.get('input[name="password"]').type('test123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-005 Login tanpa mengisi username', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC-006 Login tanpa mengisi password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC-007 Login tanpa mengisi username dan password', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC-008 Akses halaman Forgot Password', () => {
    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/requestPasswordResetCode')
  })

  it('TC-009 Login dengan username mengandung spasi', () => {
    cy.get('input[name="username"]').type(' Admin ')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().then((url) => {
      if (url.includes('/dashboard')) {
        cy.log('Login berhasil')
      } else {
        cy.contains('Invalid credentials').should('be.visible')
      }
    })
  })

  it('TC-010 Password ditampilkan dalam bentuk tersembunyi', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')

    cy.get('input[name="password"]').type('admin123')
  })

})