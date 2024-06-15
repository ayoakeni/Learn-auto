import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebaseConfig';

const auth = getAuth(app);

export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return 'User logged out';
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export default auth;