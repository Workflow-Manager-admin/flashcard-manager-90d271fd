import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- Demo data storage helper (localStorage-only for demo) ---
function loadDecks() {
  return JSON.parse(localStorage.getItem("flashcard_decks") || "[]");
}
function saveDecks(decks) {
  localStorage.setItem("flashcard_decks", JSON.stringify(decks));
}

// PUBLIC_INTERFACE
export default function FlashcardDecks() {
  const [decks, setDecks] = useState([]);
  const [newDeck, setNewDeck] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDecks(loadDecks());
  }, []);

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (!newDeck.trim()) {
      setError("Deck name cannot be empty.");
      return;
    }
    const nextDecks = [...decks, { id: Date.now() + "", name: newDeck, cards: [], stats: {} }];
    saveDecks(nextDecks);
    setDecks(nextDecks);
    setNewDeck("");
    setError("");
  };

  const handleDeleteDeck = (deckId) => {
    if (!window.confirm("Delete this deck? All cards in it will be lost.")) return;
    const nextDecks = decks.filter((d) => d.id !== deckId);
    saveDecks(nextDecks);
    setDecks(nextDecks);
  };

  return (
    <section>
      <h2>Your Decks</h2>
      <form className="deck-create-form" onSubmit={handleCreateDeck}>
        <input
          type="text"
          placeholder="New deck name"
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
        />
        <button className="primary-btn" type="submit">Add Deck</button>
      </form>
      {error && <div className="inline-error">{error}</div>}
      <div className="deck-list">
        {decks.length === 0 && <div>No decks yet. Create your first deck!</div>}
        {decks.map((deck) => (
          <div className="deck-item" key={deck.id}>
            <span className="deck-name">{deck.name}</span>
            <button
              className="deck-action"
              title="Edit cards"
              onClick={() => navigate(`/decks/${deck.id}/edit`)}
            >
              ✍️ Edit
            </button>
            <button
              className="deck-action"
              title="Review deck"
              onClick={() => navigate(`/decks/${deck.id}/review`)}
            >
              📝 Review
            </button>
            <button
              className="deck-action danger"
              title="Delete deck"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
