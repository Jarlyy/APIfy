'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import neuralService from '@/services/neural-service';

export default function HomePage() {
  const [serviceName, setServiceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      // Поиск API с помощью нейросети
      const apiData = await neuralService.searchAPI(serviceName);
      setResult(apiData);
    } catch (error) {
      console.error('Ошибка при поиске API:', error);
      alert('Произошла ошибка при поиске API. Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">APIfy</CardTitle>
            <CardDescription className="text-lg">
              Проверка работоспособности API-сервисов с использованием нейросетевых технологий
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="serviceName" className="block text-sm font-medium mb-2">
                  Название сервиса
                </label>
                <Input
                  id="serviceName"
                  value={serviceName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceName(e.target.value)}
                  placeholder="Введите название API или веб-сервиса"
                  className="w-full"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Поиск...' : 'Найти и проверить API'}
              </Button>
            </form>
            
            {result && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold mb-2">Результаты поиска:</h3>
                <div className="space-y-2">
                  <p><strong>Название сервиса:</strong> {result.serviceName}</p>
                  <p><strong>Конечная точка API:</strong> {result.apiEndpoint}</p>
                  <p><strong>Документация:</strong> <a href={result.documentationUrl} className="text-blue-600 dark:text-blue-400 hover:underline">{result.documentationUrl}</a></p>
                  <p><strong>Методы аутентификации:</strong> {result.authMethods.join(', ')}</p>
                  <div>
                    <strong>Доступные эндпоинты:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {result.endpoints.map((endpoint: string, index: number) => (
                        <li key={index}>{endpoint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Как это работает:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Введите название сервиса (например, GitHub, Twitter, Stripe)</li>
                <li>Нейросеть найдет соответствующий API и его документацию</li>
                <li>Приложение выполнит проверки работоспособности API</li>
                <li>Получите детальный отчет о состоянии API</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}