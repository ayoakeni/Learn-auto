import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../utils/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const CourseSelection = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleCourseSelection = async () => {
    const user = auth.currentUser;
  
    if (user) {
      try {
        await updateProfile(user, { displayName: selectedCourse });
        await setDoc(doc(db, 'users', user.uid), { course: selectedCourse }, { merge: true });
        navigate('/dashboard');
      } catch (error) {
        if (error.code === 'unavailable') {
          alert('You are currently offline. Please check your internet connection and try again.');
        } else {
          console.error('Error updating user profile or Firestore document:', error);
        }
      }
    }
  };

  return (
    <div className="course-selection">
      <h1>Select a Course</h1>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select a course</option>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="spanish">Spanish</option>
      </select>
      <button onClick={handleCourseSelection} disabled={!selectedCourse}>
        Proceed
      </button>
    </div>
  );
};

export default CourseSelection;