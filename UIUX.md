# General

- Cursor pointer on all clickable buttons
- Aria labels on all clickalbe icons for screen readers
- Most elements are centred to make it easier to focus
- If an error occurs on a text input an error is displayed below the input and changes colour to red.

# Admin

- Login and register forms have a show password button. This button is also removed from the tab index to remove accidental trigging of it.
- When creating a quiz, a popup is shown to not break the flow of navigation
- If no quiz is chosen in the active quiz section the buttons on the right are disabled
- Helper text is shown if there is no questions to choose from in the active quiz section
- If no question is selected in the active quiz section, helper text is shown to tell the user to click and active quiz to use the interface
- When initially starting a quiz, the play button switches text to quiz link. This is as the user can not "start" a quiz already started, but may still want to access the quiz link.
- The quiz link in the acitve quiz section is location near the player list, as they are more directly related. This leaves more space for the two more important button these been the advance and stop quiz buttons.
- The title of the quiz in the active quiz section is given a box shadow to make it easier to read over any image chosen.
- On the quiz link modal when clicking the link itself, it opens the page in a tab instead of the current.
- Most buttons are accompanied by a distict symbols to make it easier to remember what each buttons purpose is. E.g. play and pen symbol for play and edit respectively

# Play

- The lobby screen has a loading circle to show the user, that they are currently waiting for the quiz to start.
- The header disappears from the play screen, as it has no funtional use for a player and provides more screen space for the game itself.
- Each answer button is given a different colour to make it easier to diferentiate between them
- When given the result of the question, the colour of the background descibes how they did
  - Green = correct
  - Red = incorrect
  - Purple = late/did not answer the question
