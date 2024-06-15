import React, { useState } from 'react';
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import useFontSize from '../components/useFontSize';
import '../assets/css/deleteAccountModal.css';

function DeleteAccountModal({ onClose, onDelete }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);
      try {
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        alert("Account deleted successfully!");
        onDelete();
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("An error occurred while deleting your account. Please try again.");
      }
    } else {
      alert("No user is currently logged in.");
    }
  };

  const [fontSize] = useFontSize();

  return (
    <div className="modal-container btn-del-con">
      <div className={`modal-content font-size-${fontSize}`}>
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="form-group">
          <label>Please enter your password to confirm:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="btn-del">
          <button className='delete' onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;