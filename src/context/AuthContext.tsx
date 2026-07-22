import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile, UserRole } from '../types';

interface AuthContextType {
  session: Session | null;
  user: unknown;
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

  // Fetch the profile row for a given user ID
const loadProfile = async (userId: string): Promise<Profile | null> => {
  console.log("Loading profile for:", userId);

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  console.log("Profile data:", data);
  console.log("Profile error:", error);

  if (error) {
    console.warn("[AuthContext] loadProfile error:", error.message);
    return null;
  }

  return data as Profile;
};
  useEffect(() => {
  console.log("1. AuthContext mounted");

  supabase.auth.getSession().then(async ({ data: { session } }) => {
    console.log("2. getSession finished", session);

    setSession(session);

    if (session?.user) {
      console.log("3. Loading profile...");
      const p = await loadProfile(session.user.id);
      console.log("4. Profile loaded", p);
      setProfile(p);
    } else {
      console.log("5. No session");
      setProfile(null);
    }

    console.log("6. Setting loading false");
    setLoading(false);
  }).catch((err) => {
    console.error("Error in getSession:", err);
    setLoading(false);
  });
 

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    console.log("7. Auth state changed", _event);

    setSession(session);

    if (session?.user) {
      const p = await loadProfile(session.user.id);
      console.log("8. Profile after auth change", p);
      setProfile(p);
    } else {
      setProfile(null);
    }

    console.log("9. Setting loading false");
    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);

//   useEffect(() => {
//     // Load initial session
//     supabase.auth.getSession().then(async ({ data: { session } }) => {
//       setSession(session);

//       if (session?.user) {
//         const p = await loadProfile(session.user.id);
//         setProfile(p);
//       } else {
//         setProfile(null);
//       }

//       setLoading(false);
//     });

//     // Listen for auth state changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       setSession(session);

//       if (session?.user) {
//         const p = await loadProfile(session.user.id);
//         setProfile(p);
//       } else {
//         setProfile(null);
//       }

//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

  // User Signup
  const signup = async (
    email: string,
    password: string,
    username: string
  ) => {
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
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
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