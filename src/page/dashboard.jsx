import React, { useState, useRef } from 'react';
import Header from '../components/header';
import SideBar from '../components/sideBar';
import ScrollToTopButton from '../components/scrollToTopButton';
import Modal from '../components/modal';
import useFontSize from '../components/useFontSize';
import Lesson1 from '../components/lessons/lesson1';
import Lesson2 from '../components/lessons/lesson2';
import Lesson3 from '../components/lessons/lesson3';
import Exercise1 from '../components/exercises/exercise1';
import Exercise2 from '../components/exercises/exercise2';
import Exercise3 from '../components/exercises/exercise3';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/button-pressed.mp3'; // Import your sound effect file
import '../assets/css/dashboard.css';

function Dashboard() {
  const contentRef = useRef(null);
  const [showLesson, setShowLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showExercise, setShowExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [progress, setProgress] = useState({
    score: 0,
    completedLessons: [],
    completedExercises: [],
  });
  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext

  const handleComplete = (score, title, isExercise = false) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      score: prevProgress.score + score,
      completedExercises: isExercise
        ? [...prevProgress.completedExercises, title]
        : prevProgress.completedExercises,
      completedLessons: !isExercise
        ? [...prevProgress.completedLessons, title]
        : prevProgress.completedLessons,
    }));
    setShowLesson(false);
    setSelectedLesson(null);
    setShowExercise(false);
    setSelectedExercise(null);
  };

  const lessons = [
    { title: 'Lesson 1: Basics of Language', component: Lesson1 },
    { title: 'Lesson 2: Intermediate Grammar', component: Lesson2 },
    { title: 'Lesson 3: Advanced Vocabulary', component: Lesson3 },
  ];

  const exercises = [
    { title: 'Exercise 1: Fill in the Blanks', component: Exercise1 },
    { title: 'Exercise 2: Multiple Choice Questions', component: Exercise2 },
    { title: 'Exercise 3: Sentence Formation', component: Exercise3 },
  ];

  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
    setShowLesson(true);
    playSoundEffect(); // Play sound effect when opening a lesson
  };

  const openExercise = (exercise) => {
    setSelectedExercise(exercise);
    setShowExercise(true);
    playSoundEffect(); // Play sound effect when opening an exercise
  };

  const closeLesson = () => {
    setShowLesson(false);
    setSelectedLesson(null);
    playSoundEffect(); // Play sound effect when closing a lesson
  };

  const closeExercise = () => {
    setShowExercise(false);
    setSelectedExercise(null);
    playSoundEffect(); // Play sound effect when closing an exercise
  };

  const [fontSize] = useFontSize();

  return (
    <div className='container'>
      <Header />
      <SideBar />
      <div ref={contentRef} className={`content dash-con font-size-${fontSize}`}>
        <div className="dashboard">
          <h1>Welcome to Your Dashboard</h1>
          <div className="dashboard-section">
            <h2>My Progress</h2>
            <div className="progress">
              <p>Score: {progress.score}</p>
              <p>Completed Lessons: {progress.completedLessons.length}</p>
              <p>Completed Exercises: {progress.completedExercises.length}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <h2>Lessons</h2>
            <ul className='lessons-topics'>
              {lessons.map((lesson, index) => (
                <li key={index} onClick={() => openLesson(lesson)}>
                  {lesson.title}
                  {progress.completedLessons.includes(lesson.title) && (
                    <i className="fa-regular fa-circle-check check-icon"></i>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-section">
            <h2>Exercises</h2>
            <ul className='exercises-topics'>
              {exercises.map((exercise, index) => (
                <li key={index} onClick={() => openExercise(exercise)}>
                  {exercise.title}
                  {progress.completedExercises.includes(exercise.title) && (
                    <i className="fa-regular fa-circle-check check-icon"></i>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <ScrollToTopButton targetRef={contentRef} />
        </div>
      </div>
      <Modal show={showLesson} onClose={closeLesson}>
        {selectedLesson && <selectedLesson.component title={selectedLesson.title} onComplete={(score) => handleComplete(score, selectedLesson.title)} />}
      </Modal>
      <Modal show={showExercise} onClose={closeExercise}>
        {selectedExercise && <selectedExercise.component title={selectedExercise.title} onComplete={(score) => handleComplete(score, selectedExercise.title, true)} />}
      </Modal>
    </div>
  );
}

export default Dashboard;