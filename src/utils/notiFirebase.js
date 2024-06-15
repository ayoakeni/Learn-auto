import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from './firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

export const addNotification = async (userId, message) => {
  try {
    await addDoc(collection(db, `notifications/${userId}/list`), {
      message,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
};

export const markLessonCompleted = async (lessonId) => {
  try {
    const userId = auth.currentUser.uid;
    // Mark the lesson as completed in your database
    await addDoc(collection(db, `completedLessons/${userId}/list`), {
      lessonId,
      timestamp: serverTimestamp()
    });
    // Add a notification for the completed lesson
    await addNotification(userId, `Lesson ${lessonId} completed!`);
  } catch (error) {
    console.error('Error marking lesson completed:', error);
    throw error;
  }
};