import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer,
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  increment,
  Timestamp,
  where
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore (using configured databaseId if provided)
const rawConfig = firebaseConfig as Record<string, any>;
export const db = rawConfig.firestoreDatabaseId 
  ? getFirestore(app, rawConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test as required by skill guidelines
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client is currently offline or connecting.");
    }
  }
}
testConnection();

// Schema Types adhering to Master Instructions
export interface PSUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  bio?: string;
  createdAt?: any;
  lastSeen?: any;
  isCreator?: boolean;
}

export interface PSProfile {
  uid: string;
  bio: string;
  socialLinks: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
  isFoundingCreator: boolean;
  joinedAt?: any;
}

export interface PSLive {
  id: string;
  creatorId: string;
  creatorName?: string;
  title: string;
  description: string;
  scheduledAt?: any;
  startedAt?: any;
  endedAt?: any;
  streamUrl?: string | null;
  isPublic: boolean;
  replayAvailable: boolean;
  viewerCount?: number;
}

export interface PSPost {
  id: string;
  authorId: string;
  authorName?: string;
  content: string;
  imageUrl?: string | null;
  createdAt: any;
  visibility: 'public' | 'friends';
  tag?: string;
  flames?: number;
}

export interface PSNote {
  id: string;
  userId?: string;
  title: string;
  category: string;
  content: string;
  createdAt: any;
  pinned?: boolean;
}

// User Document Sync
export async function syncUserDocument(user: FirebaseUser): Promise<PSUser> {
  const userRef = doc(db, 'users', user.uid);
  const profileRef = doc(db, 'profiles', user.uid);

  const snap = await getDoc(userRef);
  const now = serverTimestamp();

  if (!snap.exists()) {
    const newUser: PSUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'Sanctuary Seeker',
      photoURL: user.photoURL,
      bio: 'Walking the path from madness to meaning.',
      createdAt: now,
      lastSeen: now,
      isCreator: false
    };
    await setDoc(userRef, newUser);

    const initialProfile: PSProfile = {
      uid: user.uid,
      bio: '',
      socialLinks: { youtube: '', twitter: '', instagram: '', tiktok: '' },
      isFoundingCreator: false,
      joinedAt: now
    };
    await setDoc(profileRef, initialProfile);

    return newUser;
  } else {
    await updateDoc(userRef, { lastSeen: now });
    return snap.data() as PSUser;
  }
}

// Save sanctuary note to Firestore
export async function saveSanctuaryNoteToFirestore(note: Omit<PSNote, 'createdAt' | 'id'> & { id?: string }): Promise<string> {
  const coll = collection(db, 'sanctuary_notes');
  const docRef = await addDoc(coll, {
    ...note,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}
