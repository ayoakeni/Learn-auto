import React, { useState } from 'react';
import CompleteSound from '../completedSoundCheck';
import '../../assets/css/exercise.css';
import Modal from '../modal';

function Exercise2({ onComplete }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrections, setShowCorrections] = useState(false); // use state variable
  const [showModal, setShowModal] = useState(true);

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of language?",
      options: ["Communication", "Art", "Science", "Recreation"],
      correctAnswer: "Communication"
    },
    {
      id: 2,
      question: "Which part of speech describes an action?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correctAnswer: "Verb"
    },
    {
      id: 3,
      question: "Which of the following is a synonym for 'happy'?",
      options: ["Sad", "Joyful", "Angry", "Tired"],
      correctAnswer: "Joyful"
    },
    {
      id: 4,
      question: "What is the antonym of 'difficult'?",
      options: ["Hard", "Easy", "Complicated", "Tough"],
      correctAnswer: "Easy"
    }
  ];

  const handleChange = (e, questionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: e.target.value
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        newScore += 10; // Each correct answer is worth 5 points
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };
  
  const handleReturn = () => {
    setSubmitted(false);
    setSelectedAnswers({});
    setScore(0);
    setShowCorrections(false);
    onComplete(score); // Send the score back to the dashboard
    playCompleteSound();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const playCompleteSound = CompleteSound(); // Get the sound effect function

  return (
    <Modal
      show={showModal}
      onClose={handleClose}
      isTest={true} // or a condition that determines if it's a test
    >
      <div className='exercise-content'>
        <h2>Exercise 2: Multiple Choice Questions</h2>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.question}</p>
            {question.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) => handleChange(e, question.id)}
                    disabled={submitted}
                    checked={selectedAnswers[question.id] === option}
                  />
                  {option}
                </label>
              </div>
            ))}
            {submitted && showCorrections && (
              <span style={{ color: selectedAnswers[question.id] === question.correctAnswer ? 'green' : 'red' }}>
                {selectedAnswers[question.id] === question.correctAnswer ? 'Correct' : `Incorrect. The correct answer is ${question.correctAnswer}`}
              </span>
            )}
          </div>
        ))}
        {!submitted && <button onClick={handleSubmit}>Complete Exercise</button>}
        {submitted && (
          <>
            <p>Your score: {score}</p>
            <button onClick={() => setShowCorrections(true)}>Show Corrections</button>
            <button onClick={handleReturn}>Return to Dashboard</button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default Exercise2;