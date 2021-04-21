context('add question to quiz', () => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100);
  };

  // This is so hopefully the email is unique when testing, what are the chance
  // This hack fails... there is no way
  const name = 'emiya';
  const email = `n${getRandomNumber()}o${getRandomNumber()}t${getRandomNumber()}.ye${getRandomNumber()}sn${getRandomNumber()}t@no.com`;
  const password = 'heroOfJustice1234';

  const questionName = 'Who is best girl';
  const answers = ['Rem', 'Emilia', 'Felix', 'Subaru'];

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('add question to quiz', () => {
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

    // Editing quiz
    cy.get('div[name=myQuizzes]').click();
    cy.get('button[name=editQuiz]').click();

    cy.get('h5').then((el) => {
      expect(el.text()).to.contain('Edit Quiz');
    });

    cy.get('button[name=openAddQuestionButton]').click();
    cy.wait(1);
    cy.get('h5').then((el) => {
      expect(el.text()).to.contain('Edit Quiz');
    });

    cy.get('#inputQuestion').focus().type(questionName);
    cy.get('input[name=questionDuration]').focus().type('5');
    cy.get('input[name=questionPoints]').focus().type('5');

    for (const answer of answers) {
      cy.get('input[name=addAnswerField]').focus().type(answer);
      cy.get('button[name=addAnswerButton]').click();
    }

    cy.get('button[name=addQuestionButton]').click();
    cy.get('div[name=myQuestion0]').click();
  });
});
