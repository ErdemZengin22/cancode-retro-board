import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CardContext } from '../Context/Context';

// The CardItem component represents a single card. It receives the card object as a prop.
function CardItem({ card }) {
  // From the context, I am accessing the methods used to manage the card state.
  const { updateCard, deleteCard, moveCard, getHeaderColor } = useContext(CardContext);

  return (
    <div className="card-item">
      {/* 
        The input and textarea fields represent the header and body of the card.
        The updateCard function from the context is used to update the corresponding field whenever its value changes.
      */}
      <div className="card-item-row"><input
        className="card-item-header"
        placeholder="Enter title here"
        type="text"
        style={{ backgroundColor: getHeaderColor(card.column) }}
        maxLength={20}
        value={card.header}
        onChange={(e) => updateCard(card.column, card.id, 'header', e.target.value)}
      /></div>
      <div className="card-item-row"><textarea
        className="card-item-body"
        placeholder="Type something here"
        value={card.body}
        onChange={(e) => updateCard(card.column, card.id, 'body', e.target.value)}
      /></div>
      {/* 
        The footer contains a number of interactive buttons.
        The thumbs up/down buttons allow users to like or dislike the card. The counts are updated using the updateCard function.
        The trash icon button deletes the card using the deleteCard function.
        The arrow buttons move the card left or right among columns with the help of the moveCard function.
      */}
      <div className="card-item-footer">
  <div className="card-action">
    <button type="button" onClick={() => moveCard(card.column, card.id, 'left')}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  </div>
  <div className="card-action">
    <button type="button" className="like" onClick={() => updateCard(card.column, card.id, 'likes', card.likes + 1)}>
      <FontAwesomeIcon icon={faThumbsUp} className="like" />
      <span>{card.likes}</span>
    </button>
  </div>
  <div className="card-action">
    <button type="button" className="dislike" onClick={() => updateCard(card.column, card.id, 'dislikes', card.dislikes + 1)}>
      <FontAwesomeIcon icon={faThumbsDown} className="dislike" />
      <span>{card.dislikes}</span>
    </button>
  </div>
  <div className="card-action">
    <button type="button" className="delete" onClick={() => deleteCard(card.column, card.id)}>
      <FontAwesomeIcon icon={faTrash} className="delete" />
    </button>
  </div>
  <div className="card-action">
    <button type="button" onClick={() => moveCard(card.column, card.id, 'right')}>
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>
</div>
{/* I'm showing the card's ID at the bottom for reference */}
<div className="card-item-row id-number"><span>CARD ID:</span> {card.id}</div>
    </div>
  );
}

export default CardItem;
