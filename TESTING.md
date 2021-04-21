# H1 TESTING

# H2 Component Testing

For our component testing, we attempted to test the various components we had developed. However, we ran into an issue involving testing with Jest and Material-ui components - since many of our components were built with material ui, we were unable to provide in depth tests for our components. This was due to the way that material-ui wraps their components, and due to this, Jest was unable to find the components that we wanted to test in our own components.

We are unsure if there is a fix for this.

# H2 UI Testing

For our UI testing, we used cypress in order to test the first required "admin happy path". The next path we decided to make was an admin question create. The rationale behind this test was to test if the ui for adding a question to a test. The steps are as follows:

1. Registers successfully
2. Creates a new game successfully
3. Enters the new game edit page successfully
4. Adds a new question successfully
5. Checks that the new question has the details added correctly
