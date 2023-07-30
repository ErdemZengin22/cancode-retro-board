import React, { useState } from 'react';
import { CardContext } from './Context';

// This function component acts as a context provider for our card state and methods.
// It accepts children props which will be the components wrapped by this provider in the component tree.
function ContextProvider({ children }) {
// The useState hook is used to manage the card state, initialized with an object of empty arrays.
  const [cards, setCards] = useState({
    "Went Well": [],
    "To Improve": [],
    "Action Items": []
  });

  // getHeaderColor function assigns colors to the different column headers based on their names.
  const getHeaderColor = (column) => {
    switch (column) {
      case 'Went Well':
        return '#28a745';
      case 'To Improve':
        return '#ffc107';
      case 'Action Items':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };
// addCard function generates a new card with a unique id and adds it to the appropriate column.
  const addCard = (column) => {
    // Inside this function, there's a helper function to generate a random three digit number.
    function generateRTDN() {// R andom _ T hree _ D igit _ N umber
      const min = 100; // Smallest 3-digit number (100)
      const max = 999; // Largest 3-digit number (999)
    
      let randomNumber = Math.random() * (max - min) + min;
      randomNumber = Math.round(randomNumber);
    
      // Ensuring the number has 3 digits
      while (randomNumber < min || randomNumber > max) {
        randomNumber = Math.random() * (max - min) + min;
        randomNumber = Math.round(randomNumber);
      }
    
      return randomNumber;
    }
    const RTDN = generateRTDN();

    const newCard = {
      header: "",
      body: "",
      likes: 0,
      dislikes: 0,
      column: column,
      id: RTDN
    };
    // Updates the card state by adding the new card to the appropriate column using the setCards function.
    setCards({...cards, [column]: [...cards[column], newCard]});
  };
// deleteCard function removes a card from the specified column by filtering out the card with the given id.
  const deleteCard = (column, id) => {
    setCards({...cards, [column]: cards[column].filter((card) => card.id !== id)});
  };
// updateCard function modifies a specific field of a card in the specified column.
  const updateCard = (column, id, field, value) => {
    setCards({...cards, [column]: cards[column].map((card) => card.id === id ? { ...card, [field]: value } : card),
    });
  };
// moveCard function changes the column of a card, essentially moving the card to a different column.
  const moveCard = (column, id, direction) => {
    const cardIndex = cards[column].findIndex((card) => card.id === id);
    const columns = Object.keys(cards);
    const columnIndex = columns.indexOf(column);
    let targetColumnIndex = columnIndex + (direction === 'left' ? -1 : 1);

    if (targetColumnIndex < 0 || targetColumnIndex >= columns.length) return;

    let targetColumn = columns[targetColumnIndex];
    let card = cards[column][cardIndex];

    setCards({
      ...cards,
      [column]: cards[column].filter((card) => card.id !== id),
      [targetColumn]: [...cards[targetColumn], { ...card, column: targetColumn }]
    });
  };
// CardContext.Provider is used to pass the state and functions to the child components.
  return (
    <CardContext.Provider value={{ cards, addCard, deleteCard, updateCard, moveCard, getHeaderColor }}>
      {children}
    </CardContext.Provider>
  );
}
export default ContextProvider;
