import React, { useState } from "react";
import { useFlashcards } from "../context/FlashcardContext";

// PUBLIC_INTERFACE
function DecksPage() {
  const { decks, createDeck, updateDeck, deleteDeck } = useFlashcards();
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    if (editingId) {
      updateDeck(editingId, form);
      setEditingId(null);
    } else {
      createDeck(form);
    }
    setForm({ name: "" });
  };

  const handleEdit = (deck) => {
    setEditingId(deck.id);
    setForm({ name: deck.name });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "" });
  };

  return (
    <div className="fcapp-page">
      <div className="fcapp-page-header">
        <h1>Decks</h1>
      </div>
      <form className="fcapp-card fcapp-form" onSubmit={handleSubmit}>
        <input
          className="fcapp-in"
          placeholder="Deck name"
          value={form.name}
          onChange={e => setForm({ name: e.target.value })}
          maxLength={60}
        />
        <div className="fcapp-form-actions">
          <button className="fcapp-btn" type="submit">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              className="fcapp-btn fcapp-btn-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="fcapp-list">
        {decks.length === 0 && <div>No decks yet.</div>}
        {decks.map(deck => (
          <div key={deck.id} className="fcapp-card fcapp-card-list">
            <div className="fcapp-card-deckname">{deck.name}</div>
            <div className="fcapp-list-actions">
              <button className="fcapp-btn-mini" onClick={() => handleEdit(deck)}>
                Edit
              </button>
              <button
                className="fcapp-btn-mini fcapp-btn-danger"
                onClick={() => deleteDeck(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DecksPage;
