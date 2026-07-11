import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: any;
  role: 'admin' | 'user' | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (
  email: string,
  password: string,
  username: string
) => Promise<any>;
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
const [loading, setLoading] = useState(true);
const [role, setRole] = useState<'admin' | 'user' | null>(null);
useEffect(() => {
  supabase.auth.getSession().then(async ({ data: { session } }) => {
    setSession(session);

    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      setRole((data?.role as 'admin' | 'user') ?? 'user');
    } else {
      setRole(null);
    }

    setLoading(false);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);

    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      setRole((data?.role as 'admin' | 'user') ?? 'user');
    } else {
      setRole(null);
    }

    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);
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
  };

  return (
  <AuthContext.Provider
    value={{
      session,
      user: session?.user ?? null,
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