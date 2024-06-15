import React, { useState } from 'react';
import Modal from '../modal';
import IntroductionToLanguage from './lesson1/IntroductionToLanguage';
import BasicGrammarRules from './lesson1/BasicGrammarRules';
import CommonVocabulary from './lesson1/CommonVocabulary';
import SimpleSentenceStructures from './lesson1/SimpleSentenceStructures';
import Test from './lesson1/test1';
import Smiley from '../../assets/images/smile.png';

const topics = [
  { title: 'Introduction to the Language', component: IntroductionToLanguage },
  { title: 'Basic Grammar Rules', component: BasicGrammarRules },
  { title: 'Common Vocabulary', component: CommonVocabulary },
  { title: 'Simple Sentence Structures', component: SimpleSentenceStructures }
];

function Lesson1({ title, onComplete }) {
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
        Welcome to Lesson 1: Basics of the Language. In this lesson, you will start your journey
        to learn the fundamentals of the language.
      </p>

      <h3>Introduction to the Language</h3>
      <p>
        The language you're about to learn is rich in history and culture. It is spoken by millions 
        of people around the world and offers a unique perspective on communication. In this section, 
        you will get an overview of the language's origins, its significance in modern times, and 
        some interesting facts that make it unique.
      </p>
      <p>
        Understanding the background of a language can greatly enhance your learning experience, 
        giving you context and appreciation for the nuances you will encounter. We'll start with 
        a brief history and move on to how it has evolved to its current form.
      </p>

      <h3>Basic Grammar Rules</h3>
      <p>
        Grammar is the backbone of any language. It provides the rules and structure needed to 
        form coherent sentences. In this section, you will learn about the basic grammar rules 
        that form the foundation of the language.
      </p>
      <p>
        Topics covered will include:
      </p>
      <ul>
        <li>Parts of speech (nouns, verbs, adjectives, etc.)</li>
        <li>Sentence structure (subject-verb-object)</li>
        <li>Tenses (past, present, future)</li>
        <li>Basic punctuation</li>
      </ul>
      <p>
        These rules will help you start forming your own sentences and understanding those you read 
        or hear.
      </p>

      <h3>Common Vocabulary</h3>
      <p>
        Vocabulary is the set of words that you will use in everyday communication. In this section, 
        you will be introduced to some of the most commonly used words and phrases in the language.
      </p>
      <p>
        We'll start with basic greetings, numbers, days of the week, and common expressions that you 
        are likely to encounter frequently. Building a strong vocabulary foundation is crucial for 
        effective communication.
      </p>
      <ul>
        <li>Greetings (hello, goodbye, etc.)</li>
        <li>Numbers (one, two, three, etc.)</li>
        <li>Days of the week (Monday, Tuesday, etc.)</li>
        <li>Common phrases (please, thank you, etc.)</li>
      </ul>

      <h3>Simple Sentence Structures</h3>
      <p>
        Constructing sentences is a key part of language learning. In this section, you will learn 
        how to put together simple sentences using the grammar and vocabulary you have learned.
      </p>
      <p>
        We will cover:
      </p>
      <ul>
        <li>Basic sentence formation</li>
        <li>Questions and answers</li>
        <li>Positive and negative sentences</li>
      </ul>
      <p>
        By practicing these structures, you will be able to start having basic conversations and 
        expressing yourself in the language.
      </p>

      <h3>Objectives</h3>
      <p>
        By the end of this lesson, you should be able to introduce yourself, understand basic
        sentences, and use simple greetings and expressions. You'll have a foundational 
        understanding of the language's grammar and a basic vocabulary that will allow you 
        to navigate common social situations.
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
            <h3>You've completed Lesson 1!</h3>
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

export default Lesson1;