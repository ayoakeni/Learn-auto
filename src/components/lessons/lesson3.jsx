import React, { useState } from 'react';
import Modal from '../modal';
import AdvancedVocabularyWords from './lesson3/AdvancedVocabularyWords';
import VocabularyInContext from './lesson3/VocabularyInContext';
import SpecializedTerms from './lesson3/SpecializedTerms';
import SynonymsAndAntonyms from './lesson3/SynonymsAndAntonyms';
import Test from './lesson3/test3';
import Smiley from '../../assets/images/smile.png';
import '../../assets/css/lesson.css';
import { useLessons } from '../../components/contexts/LessonsContext';

const topics = [
  { title: 'Advanced Vocabulary Words', component: AdvancedVocabularyWords },
  { title: 'Usage of Vocabulary in Context', component: VocabularyInContext },
  { title: 'Specialized Terms for Different Fields', component: SpecializedTerms },
  { title: 'Synonyms and Antonyms', component: SynonymsAndAntonyms }
];

function Lesson3({ title, onComplete }) {
  const [showModal, setShowModal] = useState(false);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const { markLessonCompleted } = useLessons();

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

  const handleComplete = async (score) => {
    setShowModal(false);
    setCurrentTopicIndex(0);
    onComplete(score);
    console.log(`Test completed with score: ${score}`);
    await markLessonCompleted('3'); // Assuming lesson 3 is the lesson ID, change if needed
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
        Welcome to Lesson 3: Advanced Vocabulary. This lesson will expand your vocabulary and help you
        communicate more effectively in various contexts.
      </p>
      <h3>Topics Covered:</h3>
      <ul>
        <li>Advanced vocabulary words</li>
        <li>Usage of vocabulary in context</li>
        <li>Specialized terms for different fields</li>
        <li>Synonyms and antonyms</li>
      </ul>
      <h3>Objectives:</h3>
      <p>
        By the end of this lesson, you should have a broader vocabulary, be able to use advanced words
        correctly in sentences, and understand the nuances of different terms.
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
            <h3>You've completed Lesson 3!</h3>
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

export default Lesson3;