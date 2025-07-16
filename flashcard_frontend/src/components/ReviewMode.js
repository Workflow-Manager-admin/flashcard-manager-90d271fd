import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Demo: localStorage data helpers
function loadDecks() {
  return JSON.parse(localStorage.getItem("flashcard_decks") || "[]");
}
function saveDecks(decks) {
  localStorage.setItem("flashcard_decks", JSON.stringify(decks));
}

// PUBLIC_INTERFACE
export default function ReviewMode() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({});
  const [reviewComplete, setReviewComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const allDecks = loadDecks();
    setDecks(allDecks);
    const found = allDecks.find((d) => d.id === deckId);
    setDeck(found);
    setCardIdx(0);
    setShowAnswer(false);
    setReviewComplete(false);
    setResults({});
  }, [deckId]);

  if (!deck) return <div>Deck not found.</div>;
  const cards = deck.cards || [];
  if (cards.length === 0) return <div>No cards to review in this deck.</div>;

  const card = cards[cardIdx];

  const handleFlip = () => setShowAnswer(!showAnswer);

  const handleMark = (result) => {
    const updatedResults = { ...results, [card.id]: result };
    setResults(updatedResults);
    if (cardIdx + 1 < cards.length) {
      setCardIdx(cardIdx + 1);
      setShowAnswer(false);
    } else {
      setReviewComplete(true);
      // Save deck progress
      const updatedDeck = {
        ...deck,
        stats: {
          total_reviews: (deck.stats?.total_reviews || 0) + 1,
          correct: (deck.stats?.correct || 0) + Object.values(updatedResults).filter(x => x === "correct").length,
          wrong: (deck.stats?.wrong || 0) + Object.values(updatedResults).filter(x => x === "wrong").length,
        }
      };
      const nextDecks = decks.map(d => d.id === deck.id ? updatedDeck : d);
      saveDecks(nextDecks);
      setDecks(nextDecks);
      setDeck(updatedDeck);
    }
  };

  const handleRestart = () => {
    setCardIdx(0);
    setShowAnswer(false);
    setReviewComplete(false);
    setResults({});
  };
  const handleBack = () => navigate("/decks");

  if (reviewComplete) {
    const total = cards.length;
    const correct = Object.values(results).filter(x => x === "correct").length;
    return (
      <div className="review-complete">
        <h3>Review Complete!</h3>
        <p>
          {correct} / {total} correct.
        </p>
        <button className="primary-btn" onClick={handleRestart}>Review Again</button>
        <button className="secondary-btn" onClick={handleBack}>Back to Decks</button>
      </div>
    );
  }

  return (
    <section className="review-section">
      <h2>Review: {deck.name}</h2>
      <div className="review-card">
        <div className="review-card-inner">
          {!showAnswer ? (
            <div>
              <div className="review-q">Q: {card.question}</div>
              <button className="primary-btn" onClick={handleFlip}>Show Answer</button>
            </div>
          ) : (
            <div>
              <div className="review-q">Q: {card.question}</div>
              <div className="review-a">A: {card.answer}</div>
              <button onClick={() => handleMark("correct")} className="primary-btn">Mark Correct</button>
              <button onClick={() => handleMark("wrong")} className="secondary-btn">Mark Wrong</button>
            </div>
          )}
        </div>
        <div className="review-progress">{cardIdx + 1} / {cards.length}</div>
      </div>
    </section>
  );
}
