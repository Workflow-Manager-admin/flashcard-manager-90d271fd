import React, { useState } from "react";
import { useFlashcards } from "../context/FlashcardContext";

// PUBLIC_INTERFACE
function FlashcardsPage() {
  const { flashcards, createFlashcard, updateFlashcard, deleteFlashcard, decks } = useFlashcards();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ front: "", back: "", deck: "" });

  const resetForm = () => setForm({ front: "", back: "", deck: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.front || !form.back) return;
    if (editingId) {
      updateFlashcard(editingId, form);
      setEditingId(null);
    } else {
      createFlashcard(form);
    }
    resetForm();
  };

  const handleEdit = (fc) => {
    setEditingId(fc.id);
    setForm({ front: fc.front, back: fc.back, deck: fc.deck || "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="fcapp-page">
      <div className="fcapp-page-header">
        <h1>Flashcards</h1>
      </div>
      <form className="fcapp-card fcapp-form" onSubmit={handleSubmit}>
        <input
          className="fcapp-in"
          value={form.front}
          onChange={e => setForm(f => ({ ...f, front: e.target.value }))}
          placeholder="Front (Question / Prompt)"
          maxLength={120}
        />
        <input
          className="fcapp-in"
          value={form.back}
          onChange={e => setForm(f => ({ ...f, back: e.target.value }))}
          placeholder="Back (Answer)"
          maxLength={180}
        />
        <select
          className="fcapp-in"
          value={form.deck}
          onChange={e => setForm(f => ({ ...f, deck: e.target.value }))}
        >
          <option value="">Select Deck (optional)</option>
          {decks.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <div className="fcapp-form-actions">
          <button className="fcapp-btn" type="submit">
            {editingId ? "Update" : "Add"}
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
        {flashcards.length === 0 && <div>No flashcards yet.</div>}
        {flashcards.map(fc => (
          <div key={fc.id} className="fcapp-card fcapp-card-list">
            <div>
              <div className="fcapp-card-front">{fc.front}</div>
              <div className="fcapp-card-back">{fc.back}</div>
              <div className="fcapp-card-deck">
                {fc.deck && (
                  <span>
                    Deck: {decks.find(d => d.id === fc.deck)?.name || "?"}
                  </span>
                )}
              </div>
            </div>
            <div className="fcapp-list-actions">
              <button className="fcapp-btn-mini" onClick={() => handleEdit(fc)}>
                Edit
              </button>
              <button
                className="fcapp-btn-mini fcapp-btn-danger"
                onClick={() => deleteFlashcard(fc.id)}
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

export default FlashcardsPage;
