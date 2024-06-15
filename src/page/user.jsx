import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/header';
import SideBar from '../components/sideBar';
import ScrollToTopButton from '../components/scrollToTopButton';
import EditProfileModal from '../components/editProfileModal';
import ChangePasswordModal from '../components/changePasswordModal';
import DeleteAccountModal from '../components/deleteAccountModal';
import useFontSize from '../components/useFontSize';
import { useSound } from '../components/soundContext';
import '../assets/css/user.css';

function User() {
  const contentRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [fontSize, handleFontSizeChange] = useFontSize();
  const { soundEffect, toggleSoundEffect, playSoundEffect } = useSound();

  const [profile, setProfile] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA',
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
    playSoundEffect();
  };

  const handleCloseEditProfileModal = (updatedProfile) => {
    setShowEditModal(false);
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
    playSoundEffect();
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true);
    playSoundEffect();
  };

  const handleCloseDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
  };

  const handleAccountDeletion = () => {
    setShowDeleteAccountModal(false);
    alert('Account deleted successfully.');
  };

  const fontSizeClass = `font-size-${fontSize}`;

  return (
    <div className="container">
      <Header />
      <SideBar />
      <div ref={contentRef} className={`content user-Con ${fontSizeClass}`}>
        <div className="user-content">
          <h1>User Profile</h1>
          <div className="profile-section">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
          <div className="profile-section">
            <h2>Contact Details</h2>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
          <div className="profile-section">
            <h2>Account Settings</h2>
            <div className="acc-opt">
              <button onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleChangePassword}>Change Password</button>
              <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
          <div className="profile-section">
            <h2>Preferences Settings</h2>
            <div className="preference-item">
              <label htmlFor="font-size">Font Size:</label>
              <select className="font-size" value={fontSize} onChange={handleFontSizeChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="preference-item">
              <label htmlFor="course">Change Course:</label>
              <select className="course">
                <option value="course1">English</option>
                <option value="course2">French</option>
                <option value="course3">Spanish</option>
              </select>
            </div>
            <div className="preference-item">
              <label htmlFor="sound-effect">Sound Effects:</label>
              <input 
                id="sound-effect" 
                type="checkbox" 
                checked={soundEffect} 
                onChange={toggleSoundEffect} 
              />
            </div>
          </div>
          <div className="profile-section">
            <h2>Terms and Conditions</h2>
            <p><a href="terms">Read Terms and Conditions</a> & <a href="policy">Privacy Policy</a></p>
          </div>
        </div>
        <ScrollToTopButton targetRef={contentRef} />
      </div>
      {showEditModal && <EditProfileModal onClose={handleCloseEditProfileModal} initialProfile={profile} />}
      {showChangePasswordModal && <ChangePasswordModal onClose={handleCloseChangePasswordModal} />}
      {showDeleteAccountModal && <DeleteAccountModal onClose={handleCloseDeleteAccountModal} onDelete={handleAccountDeletion} />}
    </div>
  );
}

export default User;