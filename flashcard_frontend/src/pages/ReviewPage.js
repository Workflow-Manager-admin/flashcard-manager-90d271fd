import React, { useState } from "react";
import { useFlashcards } from "../context/FlashcardContext";

// PUBLIC_INTERFACE
function ReviewPage() {
  const { flashcards, stats, recordReviewResult } = useFlashcards();
  const [idx, setIdx] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [answerState, setAnswerState] = useState(null);

  if (flashcards.length === 0) {
    return (
      <div className="fcapp-page">
        <h1>Review</h1>
        <div>No flashcards to review.</div>
      </div>
    );
  }

  const current = flashcards[idx % flashcards.length];

  const handleFlip = () => setShowBack((b) => !b);

  const handleAnswer = (isCorrect) => {
    recordReviewResult(current.id, isCorrect);
    setAnswerState(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      setAnswerState(null);
      setShowBack(false);
      setIdx((i) => (i + 1) % flashcards.length);
    }, 950);
  };

  const attempts = stats[current.id]?.attempts || 0;
  const correct = stats[current.id]?.correct || 0;

  return (
    <div className="fcapp-page">
      <div className="fcapp-page-header">
        <h1>Review Mode</h1>
      </div>
      <div className="fcapp-review-card">
        <div
          className={`fcapp-card fcapp-quiz-card ${answerState ? "fcapp-quiz-" + answerState : ""}`}
        >
          <div
            className="fcapp-flash-content"
            tabIndex={0}
            onClick={handleFlip}
            onKeyPress={e => (e.key === " " || e.key.toLowerCase() === "f") && handleFlip()}
            style={{ cursor: "pointer" }}
            aria-label="Flip card"
          >
            <div className="fcapp-card-label">
              {showBack ? "Back:" : "Front:"}
            </div>
            <div className="fcapp-card-body" suppressContentEditableWarning>
              {showBack ? current.back : current.front}
            </div>
          </div>
          {showBack && (
            <div className="fcapp-quiz-actions">
              <button
                className="fcapp-btn-mini fcapp-btn-success"
                onClick={() => handleAnswer(true)}
              >
                Correct
              </button>
              <button
                className="fcapp-btn-mini fcapp-btn-danger"
                onClick={() => handleAnswer(false)}
              >
                Incorrect
              </button>
            </div>
          )}
        </div>
        <div className="fcapp-progress-indicator">
          Progress: ({idx + 1}/{flashcards.length}) |
          Card stats: {correct} / {attempts} correct
        </div>
      </div>
      <div className="fcapp-review-footer">
        <div>Tap card or press <b>F</b> to flip.</div>
      </div>
    </div>
  );
}

export default ReviewPage;
