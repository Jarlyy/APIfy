'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Убираем импорт Label
import useAuth from '@/hooks/use-auth';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

 useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // В реальной реализации здесь будет вызов API для обновления профиля
      console.log('Сохранение профиля:', { name, email });
      setIsEditing(false);
      alert('Профиль успешно обновлен');
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
      alert('Ошибка при сохранении профиля');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Требуется аутентификация</CardTitle>
            <CardDescription>
              Пожалуйста, войдите в систему для доступа к профилю
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center">Вы не вошли в систему</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Профиль пользователя</CardTitle>
          <CardDescription>Управление вашими данными и настройками</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{name || 'Без имени'}</h2>
              <p className="text-gray-600 dark:text-gray-400">{email}</p>
            </div>
            <Button variant="outline" onClick={logout}>
              Выйти
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Имя
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    // Восстанавливаем оригинальные значения
                    setName(user.name || '');
                    setEmail(user.email || '');
                  }}
                >
                  Отмена
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Редактировать профиль
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}