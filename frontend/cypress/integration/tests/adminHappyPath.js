context('Admin Happy Path', () => {
  const name = 'yesnt';
  const email = 'not.yes@no.com';
  const password = 'donots';

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  // it('admin happy path', () => {
  //   cy.get('#registerButton').click();

  //   cy.get('h1').then((el) => {
  //     expect(el.text()).to.contain('Register');
  //   });

  //   cy.get('#inputName').focus().type(name);
  //   cy.get('#inputEmail').focus().type(email);
  //   cy.get('#inputPassword').focus().type(password);
  //   cy.get('#inputConfirmPassword').focus().type(password);

  //   cy.get('button[name=register]').click();
  // });

  it('create game', () => {
    cy.get('#loginButton').click();

    cy.get('#inputEmail').focus().type(email);
    cy.get('#inputPassword').focus().type(password);

    cy.get('button[type=submit]').click();

    // Create quiz

    cy.get('#createButton').click();
    cy.get('input[name=createQuizName]').focus().type('My first Quiz');
    cy.get('button[type=submit]').click();

    cy.get('div[name=myQuizzes]').click();
  });
});
