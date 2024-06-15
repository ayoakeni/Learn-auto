import React, { useRef, useState, useEffect } from 'react';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { useLessons } from '../components/contexts/LessonsContext'; // Make sure this path is correct
import { getAuth } from 'firebase/auth';
import { app, db } from '../utils/firebaseConfig';
import Header from '../components/header';
import '../assets/css/notification.css';
import SideBar from '../components/sideBar';
import useFontSize from '../components/useFontSize';
import ScrollToTopButton from '../components/scrollToTopButton';

function Notification() {
  const contentRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const { fetchCompletedLessons } = useLessons();
  const auth = getAuth(app);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const q = query(collection(db, `notifications/${userId}/list`), orderBy('timestamp', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedNotifications = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data()); // Log fetched notifications
          fetchedNotifications.push({ id: doc.id, ...doc.data() });
        });
        setNotifications(fetchedNotifications);
        fetchCompletedLessons(); // Fetch the latest completed lessons
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId, fetchCompletedLessons]);

  const [fontSize] = useFontSize();

  return (
    <div className='container'>
      <Header />
      <SideBar />
      <div ref={contentRef} className={`content noti-con font-size-${fontSize}`}>
        <div className="notification-content">
          <h1>Notifications</h1>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-header">
                  <h3>{notification.message}</h3>
                  <p>{notification.timestamp.toDate().toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='noNotification'>No notifications yet.</p>
          )}
        </div>
        {contentRef.current && <ScrollToTopButton target={contentRef} />}
      </div>
    </div>
  );
}

export default Notification;