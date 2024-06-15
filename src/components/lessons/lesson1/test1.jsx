import React, { useState } from 'react';
import CompleteSound from '../../completedSoundCheck';
import "../../../assets/css/test.css"

function Test({ onComplete }) {
  const [score, setScore] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const playCompleteSound = CompleteSound(); // Get the sound effect function

  const questions = [
    {
      id: 1,
      question: "What is a unique feature of the language's phonetics?",
      options: {
        a: "Limited range of sounds",
        b: "Wide range of sounds",
        c: "No vowel sounds",
        d: "Only consonant sounds",
      },
      correctAnswer: "b",
      topic: "Introduction to the Language",
    },
    {
      id: 2,
      question: "Which part of speech describes actions?",
      options: {
        a: "Noun",
        b: "Adjective",
        c: "Verb",
        d: "Adverb",
      },
      correctAnswer: "c",
      topic: "Basic Grammar Rules",
    },
    {
      id: 3,
      question: "What is the word for 'hello' in the language?",
      options: {
        a: "Goodbye",
        b: "Hello",
        c: "Please",
        d: "Thank you",
      },
      correctAnswer: "b",
      topic: "Common Vocabulary",
    },
    {
      id: 4,
      question: "Which sentence is correctly structured?",
      options: {
        a: "She plays soccer.",
        b: "Plays she soccer.",
        c: "Soccer she plays.",
        d: "She soccer plays.",
      },
      correctAnswer: "a",
      topic: "Simple Sentence Structures",
    },
    {
      id: 5,
      question: "Name one influence on the historical background of the language.",
      options: null,
      correctAnswer: "trade", // example correct answer
      topic: "Introduction to the Language",
    },
    {
      id: 6,
      question: "What part of speech is used to describe nouns?",
      options: null,
      correctAnswer: "adjective", // example correct answer
      topic: "Basic Grammar Rules",
    },
  ];

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setSelectedAnswers((prev) => ({
      ...prev,
      [name]: value.toLowerCase(), // Ensure input is case-insensitive
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;

    questions.forEach((question) => {
      if (question.options) {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          score += 1;
        }
      } else {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          score += 1;
        }
      }
    });

    setScore(score);
    setShowResults(true);
  };

  const handleComplete = () => {
    onComplete(score);
    playCompleteSound();
  };

  return (
    <div className="test-content">
      <h3>Test</h3>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="question">
            <p>{question.question}</p>
            {question.options ? (
              <div className="options">
                {Object.entries(question.options).map(([key, option]) => (
                  <div key={key} className="option">
                    <input
                      type="radio"
                      id={`${question.id}-${key}`}
                      name={`${question.id}`}
                      value={key}
                      onChange={(e) => handleChange(e, question.id)}
                      disabled={showResults}
                    />
                    <label htmlFor={`${question.id}-${key}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <input
                type="text"
                placeholder='Your answer'
                name={`${question.id}`}
                onChange={(e) => handleChange(e, question.id)}
                disabled={showResults}
              />
            )}
          </div>
        ))}
        {!showResults && <button type="submit">Submit</button>}
      </form>
      {showResults && (
        <div className="results">
          <h4>Your score: {score}</h4>
          {questions.map((question) => (
            <div key={question.id} className={`result ${selectedAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
              {question.question}
              {question.options ? (
                <p>
                  Your answer: {question.options[selectedAnswers[question.id]]}
                  {selectedAnswers[question.id] === question.correctAnswer ? (
                    <span style={{ color: 'green' }}> (Correct)</span>
                  ) : (
                    <span style={{ color: 'red' }}> (Incorrect)</span>
                  )}
                  {selectedAnswers[question.id] !== question.correctAnswer && (
                    <span style={{ color: 'blue' }}> (Correct answer: {question.options[question.correctAnswer]})</span>
                  )}
                </p>
              ) : (
                <p>
                  Your answer: {selectedAnswers[question.id]}
                  {selectedAnswers[question.id] === question.correctAnswer ? (
                    <span style={{ color: 'green' }}> (Correct)</span>
                  ) : (
                    <span style={{ color: 'red' }}> (Incorrect)</span>
                  )}
                  {selectedAnswers[question.id] !== question.correctAnswer && (
                    <span style={{ color: 'blue' }}> (Correct answer: {question.correctAnswer})</span>
                  )}
                </p>
              )}
            </div>
          ))}
          <button onClick={handleComplete}>Return to Dashboard</button>
        </div>
      )}
    </div>
  );
}

export default Test;