import React, { useState } from 'react';
import useFontSize from '../components/useFontSize';
import '../assets/css/editProfileModal.css';

function EditProfileModal({ onClose, initialProfile }) {
  const [name, setName] = useState(initialProfile.name);
  const [username, setUsername] = useState(initialProfile.username);
  const [email, setEmail] = useState(initialProfile.email);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [address, setAddress] = useState(initialProfile.address);

  const handleSave = () => {
    const updatedProfile = { name, username, email, phone, address };
    localStorage.setItem('profile', JSON.stringify(updatedProfile));
    onClose(updatedProfile);
  };

  const [fontSize] = useFontSize();

  return (
    <div className="modal-container">
      <div className={`modal-content font-size-${fontSize}`}>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditProfileModal;