import React, { useState } from 'react';
import CompleteSound from '../completedSoundCheck';
import '../../assets/css/exercise.css';
import Modal from '../modal';

function Exercise1({ onComplete }) {
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '' // For the objective question
  });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrections, setShowCorrections] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const correctAnswers = {
    answer1: 'language',
    answer2: 'grammar',
    answer3: 'vocabulary',
    answer4: 'Option B' // Correct option for the objective question
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let newScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key].toLowerCase() === correctAnswers[key].toLowerCase()) {
        newScore += 10; // Each correct answer is worth 5 points
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleReturn = () => {
    setSubmitted(false);
    setAnswers({
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: ''
    });
    setShowCorrections(false);
    setShowModal(false);
    onComplete(score); // Send the score back to the dashboard
    playCompleteSound();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirmClose = () => {
    setSubmitted(false);
    setAnswers({
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: ''
    });
    setShowCorrections(false);
    setShowModal(false);
  };

  const playCompleteSound = CompleteSound(); // Get the sound effect function

  return (
    <Modal
      show={showModal}
      onClose={handleClose}
      isTest={true} // or a condition that determines if it's a test
      onConfirmClose={handleConfirmClose} // This handles closing with confirmation
    >
      <div className='exercise-content'>
        <h2>Exercise 1: Fill in the Blanks & Objective Question</h2>
        <div>
          <p>1. The study of a ____ helps in understanding different cultures.</p>
          <input
            type="text"
            name="answer1"
            value={answers.answer1}
            onChange={handleChange}
            disabled={submitted}
          />
          {showCorrections && (
            <p style={{ color: answers.answer1.toLowerCase() === correctAnswers.answer1.toLowerCase() ? 'green' : 'red' }}>
              {answers.answer1.toLowerCase() === correctAnswers.answer1.toLowerCase() ? 'Correct!' : `Incorrect. The correct answer is ${correctAnswers.answer1}.`}
            </p>
          )}
        </div>
        <div>
          <p>2. Proper ____ is essential for clear communication.</p>
          <input
            type="text"
            name="answer2"
            value={answers.answer2}
            onChange={handleChange}
            disabled={submitted}
          />
          {showCorrections && (
            <p style={{ color: answers.answer2.toLowerCase() === correctAnswers.answer2.toLowerCase() ? 'green' : 'red' }}>
              {answers.answer2.toLowerCase() === correctAnswers.answer2.toLowerCase() ? 'Correct!' : `Incorrect. The correct answer is ${correctAnswers.answer2}.`}
            </p>
          )}
        </div>
        <div>
          <p>3. Expanding your ____ will help you express your thoughts better.</p>
          <input
            type="text"
            name="answer3"
            value={answers.answer3}
            onChange={handleChange}
            disabled={submitted}
          />
          {showCorrections && (
            <p style={{ color: answers.answer3.toLowerCase() === correctAnswers.answer3.toLowerCase() ? 'green' : 'red' }}>
              {answers.answer3.toLowerCase() === correctAnswers.answer3.toLowerCase() ? 'Correct!' : `Incorrect. The correct answer is ${correctAnswers.answer3}.`}
            </p>
          )}
        </div>
        <div>
          <p>4. Which of the following is essential for language learning?</p>
          <div>
            <label>
              <input
                type="radio"
                name="answer4"
                value="Option A"
                onChange={handleChange}
                disabled={submitted}
                checked={answers.answer4 === 'Option A'}
              />
              Option A: Reading only
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="answer4"
                value="Option B"
                onChange={handleChange}
                disabled={submitted}
                checked={answers.answer4 === 'Option B'}
              />
              Option B: Reading and practicing
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="answer4"
                value="Option C"
                onChange={handleChange}
                disabled={submitted}
                checked={answers.answer4 === 'Option C'}
              />
              Option C: Listening only
            </label>
          </div>
          {showCorrections && (
            <p style={{ color: answers.answer4 === correctAnswers.answer4 ? 'green' : 'red' }}>
              {answers.answer4 === correctAnswers.answer4 ? 'Correct!' : `Incorrect. The correct answer is ${correctAnswers.answer4}.`}
            </p>
          )}
        </div>
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

export default Exercise1;