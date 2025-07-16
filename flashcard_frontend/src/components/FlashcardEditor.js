import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Helper functions for decks/cards
function loadDecks() {
  return JSON.parse(localStorage.getItem("flashcard_decks") || "[]");
}
function saveDecks(decks) {
  localStorage.setItem("flashcard_decks", JSON.stringify(decks));
}

function findDeck(decks, id) {
  return decks.find((d) => d.id === id);
}

// PUBLIC_INTERFACE
export default function FlashcardEditor() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const allDecks = loadDecks();
    setDecks(allDecks);
    const found = findDeck(allDecks, deckId);
    if (!found) { navigate("/decks"); return; }
    setDeck(found);
  }, [deckId, navigate]);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setError("Question/Answer required."); return;
    }
    const updatedDeck = { ...deck, cards: [...(deck.cards || []), { id: Date.now()+"", question, answer }] };
    const nextDecks = decks.map((d) => (d.id === deck.id ? updatedDeck : d));
    saveDecks(nextDecks);
    setDecks(nextDecks);
    setDeck(updatedDeck);
    setQuestion(""); setAnswer(""); setError("");
  };

  const handleDeleteCard = (cardId) => {
    const updatedDeck = { ...deck, cards: (deck.cards || []).filter((c) => c.id !== cardId) };
    const nextDecks = decks.map((d) => (d.id === deck.id ? updatedDeck : d));
    saveDecks(nextDecks);
    setDecks(nextDecks);
    setDeck(updatedDeck);
  };

  const handleBack = () => {
    navigate("/decks");
  };

  if (!deck) { return null; }

  return (
    <section>
      <h2>Edit Deck: {deck.name}</h2>
      <button className="secondary-btn" onClick={handleBack}>
        ← Back to Decks
      </button>
      <form className="card-create-form" onSubmit={handleAddCard}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <button className="primary-btn" type="submit">Add Card</button>
      </form>
      {error && <div className="inline-error">{error}</div>}
      <div className="card-list">
        {(deck.cards || []).length === 0 && <div>No cards yet for this deck.</div>}
        {(deck.cards || []).map(card => (
          <div key={card.id} className="card-item">
            <div>
              <strong>Q:</strong> {card.question} <br />
              <strong>A:</strong> {card.answer}
            </div>
            <button className="deck-action danger" onClick={() => handleDeleteCard(card.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </section>
  );
}
