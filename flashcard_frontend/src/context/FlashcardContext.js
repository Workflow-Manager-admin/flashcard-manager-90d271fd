import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FlashcardContext = createContext();

const storageKey = "fcapp-flashcards";
const deckStorageKey = "fcapp-decks";
const statsKey = "fcapp-stats";

// Storage helpers
function getFlashcards() {
  const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
  return data;
}

function getDecks() {
  return JSON.parse(localStorage.getItem(deckStorageKey) || "[]");
}

function getStats() {
  return JSON.parse(localStorage.getItem(statsKey) || "{}");
}

// PUBLIC_INTERFACE
export function FlashcardProvider({ children }) {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (user) {
      setFlashcards(getFlashcards());
      setDecks(getDecks());
      setStats(getStats());
    } else {
      setFlashcards([]);
      setDecks([]);
      setStats({});
    }
  }, [user]);

  // CRUD: Flashcards
  const createFlashcard = (fc) => {
    const newFcs = [...flashcards, { ...fc, id: "fc_" + Date.now() }];
    setFlashcards(newFcs);
    localStorage.setItem(storageKey, JSON.stringify(newFcs));
  };

  const updateFlashcard = (id, fc) => {
    const newFcs = flashcards.map(f => (f.id === id ? { ...f, ...fc } : f));
    setFlashcards(newFcs);
    localStorage.setItem(storageKey, JSON.stringify(newFcs));
  };

  const deleteFlashcard = (id) => {
    const newFcs = flashcards.filter(f => f.id !== id);
    setFlashcards(newFcs);
    localStorage.setItem(storageKey, JSON.stringify(newFcs));
  };

  // Deck management
  const createDeck = (deck) => {
    const newDecks = [...decks, { ...deck, id: "deck_" + Date.now() }];
    setDecks(newDecks);
    localStorage.setItem(deckStorageKey, JSON.stringify(newDecks));
  };

  const updateDeck = (id, deck) => {
    const newDecks = decks.map(d => (d.id === id ? { ...d, ...deck } : d));
    setDecks(newDecks);
    localStorage.setItem(deckStorageKey, JSON.stringify(newDecks));
  };

  const deleteDeck = (id) => {
    const newDecks = decks.filter(d => d.id !== id);
    setDecks(newDecks);
    localStorage.setItem(deckStorageKey, JSON.stringify(newDecks));
  };

  // Progress tracking
  const recordReviewResult = (fcId, correct) => {
    const newStats = { ...stats };
    newStats[fcId] = newStats[fcId] || { attempts: 0, correct: 0 };
    newStats[fcId].attempts += 1;
    if (correct) newStats[fcId].correct += 1;
    setStats(newStats);
    localStorage.setItem(statsKey, JSON.stringify(newStats));
  };

  // PUBLIC_INTERFACE
  return (
    <FlashcardContext.Provider
      value={{
        flashcards, createFlashcard, updateFlashcard, deleteFlashcard,
        decks, createDeck, updateDeck, deleteDeck,
        stats, recordReviewResult,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useFlashcards() {
  return useContext(FlashcardContext);
}
