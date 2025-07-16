import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function ProgressTracker() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    setDecks(JSON.parse(localStorage.getItem("flashcard_decks") || "[]"));
  }, []);

  if (decks.length === 0) {
    return <section><h2>Progress</h2><div>No decks yet.</div></section>;
  }

  return (
    <section>
      <h2>Your Progress</h2>
      <table className="progress-table">
        <thead>
          <tr>
            <th>Deck</th>
            <th>Reviews</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {decks.map(deck => {
            const { stats = {}, cards = [] } = deck;
            const acc = stats.correct && stats.total_reviews
              ? Math.round((stats.correct / (stats.correct + (stats.wrong || 0))) * 100)
              : 0;
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{stats.total_reviews || 0}</td>
                <td>{stats.correct || 0}</td>
                <td>{stats.wrong || 0}</td>
                <td>{acc}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
