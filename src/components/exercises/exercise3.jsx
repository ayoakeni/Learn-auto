import React, { useState } from 'react';
import CompleteSound from '../completedSoundCheck';
import '../../assets/css/exercise.css';
import Modal from '../modal';

function Exercise3({ onComplete }) {
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showCorrections, setShowCorrections] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const sentences = [
    {
      id: 1,
      scrambled: ["to", "want", "I", "learn"],
      correct: "I want to learn"
    },
    {
      id: 2,
      scrambled: ["language", "beautiful", "a", "is"],
      correct: "A language is beautiful"
    },
    {
      id: 3,
      scrambled: ["can", "you", "speak", "English"],
      correct: "Can you speak English"
    },
    {
      id: 4,
      scrambled: ["practice", "perfect", "makes"],
      correct: "Practice makes perfect"
    }
  ];

  const handleChange = (e, sentenceId) => {
    setUserAnswers({
      ...userAnswers,
      [sentenceId]: e.target.value
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    sentences.forEach((sentence) => {
      if (userAnswers[sentence.id] && userAnswers[sentence.id].trim().toLowerCase() === sentence.correct.toLowerCase()) {
        newScore += 10; // Each correct sentence is worth 10 points
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleReturn = () => {
    setSubmitted(false);
    setUserAnswers({});
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
        <h2>Exercise 3: Sentence Formation</h2>
        {sentences.map((sentence) => (
          <div key={sentence.id}>
            <p>Scrambled words: {sentence.scrambled.join(' ')}</p>
            <input
              type="text"
              placeholder="Form the correct sentence"
              onChange={(e) => handleChange(e, sentence.id)}
              disabled={submitted}
            />
            {submitted && showCorrections && (
              <p style={{ color: userAnswers[sentence.id] && userAnswers[sentence.id].trim().toLowerCase() === sentence.correct.toLowerCase() ? 'green' : 'red' }}>
                {userAnswers[sentence.id] && userAnswers[sentence.id].trim().toLowerCase() === sentence.correct.toLowerCase() ? 'Correct' : `Incorrect. The correct sentence is: "${sentence.correct}"`}
              </p>
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

export default Exercise3;