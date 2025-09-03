import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User } from '../lib/supabase';
import { authAPI } from '../lib/api';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (name: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.user);
          setSession({ access_token: token } as Session);
        } catch (error) {
          // Token inválido, remover
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);





  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        setUser(response.user);
        setSession({ access_token: response.token } as Session);
        setLoading(false);
        return {};
      } else {
        setLoading(false);
        return { error: 'Token não recebido' };
      }
    } catch (error: any) {
      setLoading(false);
      return { error: error.message || 'Erro ao fazer login' };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      const response = await authAPI.register(email, password, name);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        setUser(response.user);
        setSession({ access_token: response.token } as Session);
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'Erro ao criar conta' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (error) {
      // Continua o logout mesmo se houver erro na API
    }
    localStorage.removeItem('authToken');
    setUser(null);
    setSession(null);
    setLoading(false);
  };

  const updateProfile = async (name: string) => {
    try {
      if (!user) {
        return { error: 'Usuário não autenticado' };
      }

      setLoading(true);
      const response = await authAPI.updateProfile(name);
      
      setUser({ ...user, name });
      return {};
    } catch (error: any) {
      return { error: error.message || 'Erro ao atualizar perfil' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};