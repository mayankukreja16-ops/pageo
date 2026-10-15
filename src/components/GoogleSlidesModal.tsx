import React, { useState, useEffect } from 'react';
import { Presentation, X, CheckCircle2, ExternalLink, Loader2, LogOut, Sparkles, Layers } from 'lucide-react';
import { googleSignIn, logoutGoogle, createGoogleSlidesShowcase, SlideDeckResult } from '../services/googleSlides';
import { Product } from '../data/products';
import { User } from 'firebase/auth';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onShowToast: (msg: string) => void;
}

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({
  isOpen,
  onClose,
  products,
  onShowToast,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [createdDeck, setCreatedDeck] = useState<SlideDeckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        onShowToast(`Signed in as ${res.user.displayName || res.user.email}`);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate with Google Slides');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setAccessToken(null);
    setCreatedDeck(null);
    onShowToast('Signed out of Google Workspace');
  };

  const handleExportDeck = async () => {
    if (!accessToken) {
      setErrorMsg('Please sign in with Google first.');
      return;
    }

    setIsCreatingDeck(true);
    setErrorMsg(null);
    try {
      const result = await createGoogleSlidesShowcase(accessToken, products);
      setCreatedDeck(result);
      onShowToast('✨ Google Slides Presentation created successfully!');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to create Google Slides deck');
    } finally {
      setIsCreatingDeck(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">
                Google Slides Art Showcase
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Export colouring books & asset catalog directly to Google Slides
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-xs text-[var(--text-muted)] space-y-2">
            <p className="font-semibold text-[var(--text-main)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              What this does:
            </p>
            <p>
              Generates a professionally structured Google Slides presentation deck featuring:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Pageo Cover slide & brand introduction</li>
              <li>Colouring E-Books catalog with 300 DPI & Amazon KDP specs</li>
              <li>Procreate/Photoshop brushes & texture overlay specs</li>
              <li>Vector line art collections & commercial licensing guide</li>
            </ul>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Auth State */}
          {!currentUser ? (
            <div className="text-center py-4">
              <p className="text-xs text-[var(--text-muted)] mb-3">
                Sign in with your Google Account to create the slide deck in your Google Drive:
              </p>
              <button
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Sign in with Google to Export Slides
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* User Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-main)]">
                      {currentUser.displayName || 'Google User'}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 text-xs flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action Button */}
              {!createdDeck ? (
                <button
                  onClick={handleExportDeck}
                  disabled={isCreatingDeck}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                >
                  {isCreatingDeck ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating Google Slide Deck...
                    </>
                  ) : (
                    <>
                      <Presentation className="w-4 h-4" /> Export Presentation to My Google Slides
                    </>
                  )}
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[var(--text-main)]">
                      Slide Deck Created in Google Slides!
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {createdDeck.title}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center pt-1">
                    <a
                      href={createdDeck.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      Open in Google Slides <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setCreatedDeck(null)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                    >
                      Create Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
