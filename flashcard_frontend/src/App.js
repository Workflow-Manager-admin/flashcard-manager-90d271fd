import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FlashcardDecks from './components/FlashcardDecks';
import FlashcardEditor from './components/FlashcardEditor';
import ReviewMode from './components/ReviewMode';
import ProgressTracker from './components/ProgressTracker';
import Auth from './components/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

// Split layout/route logic so Auth state is managed cleanly for all views.
function MainLayout() {
  const { user } = useAuth();

  // Effect for theme mode; always use light for minimalism (can add toggle later)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // Not logged-in: show Auth page only.
  if (!user) {
    return (
      <div className="layout">
        <Header />
        <main className="main-content">
          <Auth />
        </main>
      </div>
    );
  }

  // Logged-in: show full flashcard app.
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/decks" replace />} />
          <Route path="/decks" element={<FlashcardDecks />} />
          <Route path="/decks/:deckId/edit" element={<FlashcardEditor />} />
          <Route path="/decks/:deckId/review" element={<ReviewMode />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
