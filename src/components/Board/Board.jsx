import React, { useContext } from 'react';
import { CardContext } from '../Context/Context';
import CardItem from './CardItem';

// In the Boards component, I am representing a board with different columns.
// Each column can hold different cards, and users can add cards to them.
function Boards() {
// I am using React's Context API to access the application state provided by CardContext.
// Cards are the different items in each column, addCard is the function to add a new card, 
// and getHeaderColor dynamically determines the color of each column's header.
  const { cards, addCard, getHeaderColor } = useContext(CardContext);

  return (
    <div className="board-container">
      <div className="retro-board">
        {/* 
          I am iterating over the columns (keys in 'cards') and for each column, 
          creating a new div with a header whose color is determined by the getHeaderColor function.
          I also add an "Add New Card" button which on click, invokes the addCard function from the context.
          Finally, for each card in the current column, I am rendering a CardItem component.
        */}
        {Object.keys(cards).map((column) => (
          <div className="board-column" key={column}>
            <div className="board-column-header" style={{ backgroundColor: getHeaderColor(column) }}>{column}</div>
            <button type="button" className="add-button" onClick={() => addCard(column)}>
              + Add New Card
            </button>
            {cards[column].map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;
