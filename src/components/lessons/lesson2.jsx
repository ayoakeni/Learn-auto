import React, { useState } from 'react';
import Modal from '../modal';
import ComplexSentenceStructures from './lesson2/ComplexSentenceStructures';
import TenseAndAspect from './lesson2/TenseAndAspect';
import Pronouns from './lesson2/Pronouns';
import IdiomaticExpressions from './lesson2/IdiomaticExpressions';
import Test from './lesson2/test2';
import Smiley from '../../assets/images/smile.png';
import '../../assets/css/lesson.css';

const topics = [
  { title: 'Complex Sentence Structures', component: ComplexSentenceStructures },
  { title: 'Grammar Rules for Tense and Aspect', component: TenseAndAspect },
  { title: 'Pronouns and Their Uses', component: Pronouns },
  { title: 'Common Idiomatic Expressions', component: IdiomaticExpressions }
];

function Lesson2({ title, onComplete }) {
  const [showModal, setShowModal] = useState(false);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const handleNext = () => {
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  const handleDone = () => {
    setShowCompletionMessage(true);
  };

  const handleComplete = (score) => {
    setShowModal(false);
    setCurrentTopicIndex(0);
    onComplete(score);
    console.log(`Test completed with score: ${score}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTopicIndex(0);
    setShowCompletionMessage(false);
  };

  const handleOk = () => {
    setShowCompletionMessage(false);
    setShowTest(true);
  };

  const CurrentTopicComponent = topics[currentTopicIndex]?.component;

  return (
    <div className='lesson-content'>
      <h2>{title}</h2>
      <p>
        Welcome to Lesson 2: Intermediate Grammar. In this lesson, we will dive deeper into the
        grammar of the language and build on the basics covered in Lesson 1.
      </p>
      <h3>Topics Covered:</h3>
      <ul>
        <li>Complex sentence structures</li>
        <li>Grammar rules for tense and aspect</li>
        <li>Pronouns and their uses</li>
        <li>Common idiomatic expressions</li>
      </ul>
      <h3>Objectives:</h3>
      <p>
        By the end of this lesson, you should be able to form more complex sentences, understand
        and use different tenses, and correctly use pronouns and idiomatic expressions in conversations.
      </p>
      <button onClick={() => setShowModal(true)}>Open Lesson</button>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onDone={handleDone}
        showNext={currentTopicIndex < topics.length - 1}
        showPrevious={currentTopicIndex > 0}
        showDone={currentTopicIndex === topics.length - 1}
        showCompletionMessage={showCompletionMessage}
        isTest={showTest}
      >
        {showCompletionMessage ? (
          <div className='completion'>
            <h3>You've completed Lesson 2!</h3>
            <img src={Smiley} alt='smiley face' />
            <p>Let's test your knowledge of what you have learned so far.</p>
            <button onClick={handleOk}>OK</button>
          </div>
        ) : (
          showTest ? (
            <Test onComplete={handleComplete} />
          ) : (
            <CurrentTopicComponent onComplete={handleComplete} />
          )
        )}
      </Modal>
    </div>
  );
}

export default Lesson2;