context('Admin Happy Path', () => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100);
  };
  const name = 'yesnt';
  // This is so hopefully the email is unique when testing, what are the chance
  // This hack fails... there is no way
  const email = `n${getRandomNumber()}o${getRandomNumber()}t${getRandomNumber()}.ye${getRandomNumber()}sn${getRandomNumber()}t@no.com`;
  const password = 'donots';

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('admin happy path', () => {
    // Go to register button
    cy.get('#registerButton').click();

    // Register new user
    cy.get('h1').then((el) => {
      expect(el.text()).to.contain('Register');
    });

    cy.get('#inputName').focus().type(name);
    cy.get('#inputEmail').focus().type(email);
    cy.get('#inputPassword').focus().type(password);
    cy.get('#inputConfirmPassword').focus().type(password);

    cy.get('button[name=register]').click();

    cy.get('h4').then((el) => {
      expect(el.text()).to.contain('Dashboard');
    });

    // Create quiz

    cy.get('#createButton').click();
    cy.get('button[type=submit]').then((el) => {
      expect(el.text()).to.contain('Create Quiz');
    });
    cy.get('input[name=createQuizName]').focus().type('My first Quiz');
    cy.get('button[type=submit]').click();

    // Start quiz
    cy.get('div[name=myQuizzes]').click();

    cy.get('button[name=startQuiz]:first').click();
    cy.get('button[name=closeModal]').click();

    // End quiz
    cy.get('div[name=activeQuizzes]').click();
    cy.get('button[name=activeQuizStop]').should('be.disabled');
    cy.get('ul li:last').click();
    cy.get('button[name=activeQuizStop]').should('not.be.disabled');
    cy.get('button[name=activeQuizStop]').click();

    // See results
    cy.get('button[name=yesResults]').click();
    cy.get('h3').then((el) => {
      expect(el.text()).to.contain(
        'There was no active players for this quiz session.',
      );
    });
    // Log out
    cy.get('button[name=headerLogout]').click();

    // Login
    cy.get('#loginButton').click();

    cy.get('#inputEmail').focus().type(email);
    cy.get('#inputPassword').focus().type(password);

    cy.get('button[type=submit]').click();

    cy.get('h4').then((el) => {
      expect(el.text()).to.contain('Dashboard');
    });
  });
});
