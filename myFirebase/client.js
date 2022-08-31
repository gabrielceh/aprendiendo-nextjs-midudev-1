// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, Timestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8S0cIqB__TGbY2K0MMEjZxPK-dqsx_68',
  authDomain: 'nextjs-1-devter.firebaseapp.com',
  projectId: 'nextjs-1-devter',
  storageBucket: 'nextjs-1-devter.appspot.com',
  messagingSenderId: '194063445121',
  appId: '1:194063445121:web:d58d291856a021c8433180',
  measurementId: 'G-2JLMZRXCL4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const analytics = getAnalytics(app);

const mapUserFromFirebaseAuth = (user) => {
  const { uid, email, photoURL, displayName, reloadUserInfo } = user;
  const { screenName } = reloadUserInfo;

  return {
    uid,
    avatar: photoURL,
    username: displayName || screenName,
    email,
    url: `https://github.com/${screenName}`,
  };
};

export const authStateChanged = (onChange) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const normalizeUser = mapUserFromFirebaseAuth(user);
      onChange(normalizeUser);
    } else {
      return onChange(null);
    }
  });
};

export const loginGitHub = async () => {
  try {
    const githubProvider = new GithubAuthProvider();
    const { user } = await signInWithPopup(auth, githubProvider);
    return mapUserFromFirebaseAuth(user);
  } catch (error) {
    console.log(error);
  }
};

export const addDevit = ({ content, avatar, userId, userName }) => {
  console.log(avatar);
  return addDoc(collection(db, 'devits'), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return getDocs(collection(db, 'devits')).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      const date = createdAt.toDate();
      // es-419 es español de latinoamerica
      const intl = new Intl.DateTimeFormat('es-419');
      const normalizeCreatedAt = intl.format(date);
      return {
        id,
        ...data,
        createdAt: normalizeCreatedAt,
      };
    });
  });
};

export { auth, db };
