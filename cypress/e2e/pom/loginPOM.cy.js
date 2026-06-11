import LoginPage from '../../pages/LoginPage'

describe('OrangeHRM Login POM', () => {

  const loginPage = new LoginPage()

 beforeEach(() => {
  cy.clearCookies()
  cy.clearLocalStorage()

  loginPage.visit()
})

  it('TC-001 Login berhasil', () => {
    cy.fixture('loginData').then((data) => {

      loginPage.enterUsername(data.validUser.username)
      loginPage.enterPassword(data.validUser.password)
      loginPage.clickLogin()

      loginPage.verifyDashboard()
    })
  })

  it('TC-002 Password salah', () => {
    cy.fixture('loginData').then((data) => {

      loginPage.enterUsername(data.invalidPassword.username)
      loginPage.enterPassword(data.invalidPassword.password)
      loginPage.clickLogin()

      loginPage.verifyInvalidCredentials()
    })
  })

  it('TC-003 Username salah', () => {
    cy.fixture('loginData').then((data) => {

      loginPage.enterUsername(data.invalidUsername.username)
      loginPage.enterPassword(data.invalidUsername.password)
      loginPage.clickLogin()

      loginPage.verifyInvalidCredentials()
    })
  })

  it('TC-004 Username kosong', () => {

    loginPage.enterPassword('admin123')
    loginPage.clickLogin()

    loginPage.verifyRequired()

  })

  it('TC-005 Forgot Password', () => {

    loginPage.clickForgotPassword()

    cy.url().should('include', '/requestPasswordResetCode')

  })

})