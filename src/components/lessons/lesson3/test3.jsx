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
      question: "Which word is an example of advanced vocabulary?",
      options: {
        a: "Happy",
        b: "Elated",
        c: "Sad",
        d: "Angry",
      },
      correctAnswer: "b",
      topic: "Advanced Vocabulary Words",
    },
    {
      id: 2,
      question: "What is a specialized term for a medical professional who performs surgeries?",
      options: {
        a: "Doctor",
        b: "Nurse",
        c: "Surgeon",
        d: "Therapist",
      },
      correctAnswer: "c",
      topic: "Specialized Terms for Different Fields",
    },
    {
      id: 3,
      question: "What is a synonym for 'happy'?",
      options: {
        a: "Sad",
        b: "Angry",
        c: "Joyful",
        d: "Tired",
      },
      correctAnswer: "c",
      topic: "Synonyms and Antonyms",
    },
    {
      id: 4,
      question: "Which sentence correctly uses the word 'persevere'?",
      options: {
        a: "She decided to persevere despite the difficulties.",
        b: "He was persevere to the new job.",
        c: "They persevere the food quickly.",
        d: "We will persevere the game tomorrow.",
      },
      correctAnswer: "a",
      topic: "Usage of Vocabulary in Context",
    },
    {
      id: 5,
      question: "Provide an antonym for 'difficult'.",
      options: null,
      correctAnswer: "easy", // example correct answer
      topic: "Synonyms and Antonyms",
    },
    {
      id: 6,
      question: "What is an advanced vocabulary word for 'very tired'?",
      options: null,
      correctAnswer: "exhausted", // example correct answer
      topic: "Advanced Vocabulary Words",
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