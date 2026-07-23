import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile, UserRole } from '../types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  signup: (
    email: string,
    password: string,
    username: string
  ) => Promise<unknown>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the profile row for a given user ID safely with timeout protection
  const loadProfile = async (userId: string): Promise<Profile | null> => {
    console.log('[AuthContext] Loading profile for userId:', userId);

    try {
      const queryPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: { message: 'Profile query timeout' } }), 4000)
      );

      const res = await Promise.race([queryPromise, timeoutPromise]);

      if (res.error) {
        console.warn('[AuthContext] loadProfile error/timeout:', res.error.message);
        return null;
      }

      console.log('[AuthContext] Profile loaded:', res.data);
      return res.data as Profile | null;
    } catch (err) {
      console.error('[AuthContext] loadProfile exception:', err);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    console.log('[AuthContext] Provider mounted');

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthContext] Auth state event:', event, session?.user?.id ?? 'No user');

      if (!isMounted) return;
      setSession(session);

      // Defer async database call to next macro-task tick to escape Supabase internal auth lock deadlock
      setTimeout(async () => {
        if (!isMounted) return;

        try {
          if (session?.user) {
            const p = await loadProfile(session.user.id);
            if (isMounted) {
              if (p) {
                setProfile(p);
              } else {
                setProfile((prev) => prev ?? null);
              }
            }
          } else {
            if (isMounted) {
              setProfile(null);
            }
          }
        } catch (err) {
          console.error('[AuthContext] Error in onAuthStateChange handler:', err);
        } finally {
          if (isMounted) {
            console.log('[AuthContext] Setting loading false from onAuthStateChange');
            setLoading(false);
          }
        }
      }, 0);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // User Signup
  const signup = async (
    email: string,
    password: string,
    username: string
  ) => {
    console.log('[AuthContext] Signing up user:', email, username);
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role: 'user',
        },
      },
    });
  };

  // User Login
  const login = async (email: string, password: string) => {
    console.log('[AuthContext] Logging in user:', email);
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  // Logout
  const logout = async () => {
    console.log('[AuthContext] Logging out');
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const role = profile?.role ?? null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        role,
        isAuthenticated: !!session,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};