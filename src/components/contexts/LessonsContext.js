import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../utils/firebaseConfig';

const LessonsContext = createContext();

const lessonsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LESSONS':
      return {
        ...state,
        completedLessons: action.completedLessons,
      };
    case 'ADD_COMPLETED_LESSON':
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.lessonId],
      };
    default:
      return state;
  }
};

export const LessonsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lessonsReducer, {
    completedLessons: [],
  });

  const fetchCompletedLessons = async (userId) => {
    if (!userId) return;

    const querySnapshot = await getDocs(collection(db, `completedLessons/${userId}/list`));
    const completedLessons = querySnapshot.docs.map((doc) => doc.data().lessonId);
    dispatch({ type: 'SET_LESSONS', completedLessons });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCompletedLessons(user.uid);
      } else {
        dispatch({ type: 'SET_LESSONS', completedLessons: [] });
      }
    });

    return () => unsubscribe();
  }, []);

  const markLessonCompleted = async (lessonId) => {
    try {
      const userId = auth.currentUser.uid;
      await addDoc(collection(db, `completedLessons/${userId}/list`), {
        lessonId,
        timestamp: serverTimestamp(),
      });
      dispatch({ type: 'ADD_COMPLETED_LESSON', lessonId });
    } catch (error) {
      console.error('Error marking lesson completed:', error);
      throw error;
    }
  };

  return (
    <LessonsContext.Provider value={{ state, dispatch, fetchCompletedLessons, markLessonCompleted }}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = () => useContext(LessonsContext);