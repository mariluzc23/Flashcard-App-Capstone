# Flashcard-o-matic

**Flashcard-o-matic** is a flashcard application designed for a local school to help students study online. Teachers can create decks of flashcards for the subjects they teach, and students can study those decks. This project showcases the ability to work with React's state management and rendering, while also focusing on routing, creating, and managing dynamic data.

## Features

- **Create Decks:** Teachers can create new decks of flashcards for their subjects.
- **Study Decks:** Students can study flashcards in a deck, with a "flip" feature to view the answer.
- **Edit Decks:** Edit an existing deck of flashcards.
- **Add/Edit Cards:** Easily add new cards to an existing deck or modify current ones.
- **Delete Decks/Cards:** Users can delete decks or individual cards.

## Table of Contents
- Installation
- Screens
    - Home
    - Study
    - Create Deck
    - Deck
    - Edit Deck
    - Add Card
    - Edit Card
- Technology

## Instalation
1. Clone the repository:
```bash
git clone https://github.com/mariluzc23/Flashcard-App-Capstone.git
```

2. Navigate to the project directory:
```bash
cd Flashcard-App-Capstone
```

3. Install dependencies:
```bash
npm install
```

4. Start the application:
```basth
npm start
```

5. To run the tests:
```npm test
```

## Screens

### Home
- Path: /
- The home page shows all existing decks with buttons for:
    - **Create Deck:** Takes you to the "Create Deck" screen.
    - **Study:** Takes you to the "Study Deck" screen.
    - **View:** Shows deck details.
    - **Delete:** Deletes the selected deck with a confirmation dialog.

### Study
- Path: /decks/:deckId/study
- he study screen displays flashcards one by one. You can flip the card to see the answer, and once all cards are shown, you are prompted to restart or return to the home screen.

### Create Deck
- Path: /decks/new
- The "Create Deck" screen allows you to input a deck name and description. Submitting the form adds the new deck and navigates to the deck's detail view.

### Deck
- Path: /decks/:deckId
- The deck screen shows all information about a specific deck, with options to edit, study, or add new cards. The deck's list of cards is displayed with options to edit or delete each card.

### Edit Deck
- Path: /decks/:deckId/edit
- The "Edit Deck" screen allows you to modify the name and description of an existing deck.

### Add Card
- Path: /decks/:deckId/cards/new
- Add new cards to an existing deck by filling out the front and back fields.

### Edit Card
- Path: /decks/:deckId/cards/:cardId/edit
- Modify the front and back content of an existing card.

## Technology
- **React:** Frontend library for building user interfaces.
- **React Router:** For managing navigation and dynamic routing.
- **Bootstrap 4:** For styling components.
- **JSON Server:** Mock API server to simulate backend operations.
- **Jest:** For running unit tests.

