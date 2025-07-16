import React from "react";
import { useFlashcards } from "../context/FlashcardContext";

// PUBLIC_INTERFACE
function ProgressPage() {
  const { flashcards, stats } = useFlashcards();

  const getAccuracy = (fc) => {
    const rec = stats[fc.id];
    if (!rec || !rec.attempts) return "—";
    return ((rec.correct / rec.attempts) * 100).toFixed(0) + "%";
  };

  const total = flashcards.length;
  const attempted = flashcards.filter(fc => stats[fc.id]?.attempts > 0).length;
  const mastered = flashcards.filter(fc => stats[fc.id]?.correct >= 3).length;

  return (
    <div className="fcapp-page">
      <div className="fcapp-page-header">
        <h1>Progress</h1>
      </div>
      <div className="fcapp-progress-summary">
        <div>Total Cards: <b>{total}</b></div>
        <div>Attempted: <b>{attempted}</b></div>
        <div>Mastered (3+ correct): <b>{mastered}</b></div>
      </div>
      <h2>Your Flashcards</h2>
      <div className="fcapp-list">
        {flashcards.length === 0 && <div>No flashcards found.</div>}
        {flashcards.map(fc => (
          <div key={fc.id} className="fcapp-card fcapp-card-list">
            <div>
              <div className="fcapp-card-front">{fc.front}</div>
              <div className="fcapp-card-back">{fc.back}</div>
            </div>
            <div className="fcapp-card-stats">
              Attempts: {stats[fc.id]?.attempts || 0} | Correct: {stats[fc.id]?.correct || 0} | Accuracy: {getAccuracy(fc)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressPage;
