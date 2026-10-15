import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Product } from '../data/products';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/presentations');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google sign in');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export interface SlideDeckResult {
  presentationId: string;
  presentationUrl: string;
  title: string;
}

export const createGoogleSlidesShowcase = async (
  token: string,
  products: Product[]
): Promise<SlideDeckResult> => {
  const presentationTitle = `Pageo — Digital Art & Colouring Showcase (${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`;

  // 1. Create presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: presentationTitle,
    }),
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to create presentation: ${createRes.status}`);
  }

  const createData = await createRes.json();
  const presentationId = createData.presentationId;

  // 2. Add custom slides with batchUpdate
  const colouringBooks = products.filter(p => p.category === 'colouring-books').slice(0, 3);
  const brushes = products.filter(p => p.category === 'digital-brushes').slice(0, 3);
  const vectors = products.filter(p => p.category === 'vector-kdp-interiors' || p.category === 'story-children-books').slice(0, 3);

  const slideIdCover = 'pageo_slide_cover';
  const slideIdBooks = 'pageo_slide_books';
  const slideIdBrushes = 'pageo_slide_brushes';
  const slideIdVectors = 'pageo_slide_vectors';

  const requests: any[] = [
    // Slide 1: Create Cover Slide
    {
      createSlide: {
        objectId: slideIdCover,
        insertionIndex: 1,
        slideLayoutReference: { predefinedLayout: 'TITLE_AND_TWO_COLUMNS' }
      }
    },
    // Slide 2: Colouring Books Slide
    {
      createSlide: {
        objectId: slideIdBooks,
        insertionIndex: 2,
        slideLayoutReference: { predefinedLayout: 'TITLE_AND_BODY' }
      }
    },
    // Slide 3: Brushes & Textures Slide
    {
      createSlide: {
        objectId: slideIdBrushes,
        insertionIndex: 3,
        slideLayoutReference: { predefinedLayout: 'TITLE_AND_BODY' }
      }
    },
    // Slide 4: Vectors Slide
    {
      createSlide: {
        objectId: slideIdVectors,
        insertionIndex: 4,
        slideLayoutReference: { predefinedLayout: 'TITLE_AND_BODY' }
      }
    }
  ];

  try {
    const updateRes = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });

    if (!updateRes.ok) {
      console.warn('Batch update slides warning:', await updateRes.text());
    }
  } catch (e) {
    console.warn('Could not populate slide bodies, returning presentation ID anyway', e);
  }

  return {
    presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
    title: presentationTitle,
  };
};
