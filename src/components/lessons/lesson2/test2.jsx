import React, { useState } from 'react';
import CompleteSound from '../../completedSoundCheck';
import "../../../assets/css/test.css";

function Test({ onComplete }) {
  const [score, setScore] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const playCompleteSound = CompleteSound(); // Get the sound effect function

  const questions = [
    {
      id: 1,
      question: "What is an example of a complex sentence structure?",
      options: {
        a: "I like apples.",
        b: "Although he was tired, he finished his homework.",
        c: "She is happy.",
        d: "They are friends.",
      },
      correctAnswer: "b",
      topic: "Complex Sentence Structures",
    },
    {
      id: 2,
      question: "Which tense is used to describe an action happening now?",
      options: {
        a: "Past tense",
        b: "Future tense",
        c: "Present continuous tense",
        d: "Present perfect tense",
      },
      correctAnswer: "c",
      topic: "Tense and Aspect",
    },
    {
      id: 3,
      question: "What is the pronoun for a singular female?",
      options: {
        a: "He",
        b: "They",
        c: "She",
        d: "It",
      },
      correctAnswer: "c",
      topic: "Pronouns",
    },
    {
      id: 4,
      question: "Which idiomatic expression means to start something new and different?",
      options: {
        a: "Kick the bucket",
        b: "Break the ice",
        c: "Turn over a new leaf",
        d: "Bite the bullet",
      },
      correctAnswer: "c",
      topic: "Idiomatic Expressions",
    },
    {
      id: 5,
      question: "Name one conjunction used in complex sentences.",
      options: null,
      correctAnswer: "although", // example correct answer
      topic: "Complex Sentence Structures",
    },
    {
      id: 6,
      question: "What is the past tense form of 'go'?",
      options: null,
      correctAnswer: "went", // example correct answer
      topic: "Tense and Aspect",
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
                placeholder="Your answer"
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
            <div
              key={question.id}
              className={`result ${selectedAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}`}
            >
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