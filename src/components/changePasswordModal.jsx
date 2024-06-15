import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import useFontSize from '../components/useFontSize';
import '../assets/css/editProfileModal.css'; 

function ChangePasswordModal({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match!");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert("Password changed successfully!");
        onClose();
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("No user is currently logged in.");
    }
  };

  const [fontSize] = useFontSize();

  return (
    <div className="modal-container">
      <div className={`modal-content font-size-${fontSize}`}>
        <h2>Change Password</h2>
        {error && <p className="error-message" style={{ color: 'red', textAlign: 'center'}}>{error}</p>}
        <div className="form-group">
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ChangePasswordModal;