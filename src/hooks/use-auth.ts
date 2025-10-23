import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

// Тип для пользователя
interface User {
  id: string;
 email: string;
  name?: string;
}

/**
 * Хук для управления состоянием аутентификации
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Проверяем сессию при загрузке
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name
        });
      }
      
      setLoading(false);
      
      // Подписываемся на аутентификационные события
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event: any, session: any) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name
            });
          } else {
            setUser(null);
          }
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    checkSession();
  }, []);

  /**
   * Регистрация пользователя
   */
  const signup = async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });
    
    if (error) throw error;
  };

  /**
   * Вход пользователя
   */
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
  };

  /**
   * Выход пользователя
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
 };

  return {
    user,
    loading,
    signup,
    login,
    logout
  };
};

export default useAuth;