'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APITest } from '@/lib/types';
import apiTestService from '@/services/api-test-service';
import TestResultCard from '@/components/cards/test-result-card';

export default function TestsPage() {
  const [tests, setTests] = useState<APITest[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState('');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiHeaders, setApiHeaders] = useState('{}');
  const [apiBody, setApiBody] = useState('');

  // Загружаем историю проверок
  useEffect(() => {
    const fetchTests = async () => {
      try {
        // В реальной реализации здесь будет вызов API для получения истории проверок
        // Пока используем заглушку
        const mockTests: APITest[] = [
          {
            id: '1',
            userId: 'user1',
            serviceName: 'Test Service',
            apiEndpoint: 'https://api.test.com/test',
            testStatus: 'success',
            responseTime: 245,
            responseBody: '{"message": "success"}',
            responseStatus: 200,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            userId: 'user1',
            serviceName: 'Test Service 2',
            apiEndpoint: 'https://api.test.com/test2',
            testStatus: 'failed',
            responseTime: 1500,
            responseBody: '{"error": "timeout"}',
            responseStatus: 408,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ];
        setTests(mockTests);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleRunTest = async () => {
    if (!apiUrl) {
      alert('Пожалуйста, введите URL API');
      return;
    }

    try {
      // В реальной реализации здесь будет вызов сервиса для выполнения проверки API
      console.log('Running test for:', { apiUrl, apiMethod, apiHeaders, apiBody });
      alert('Проверка API выполнена (в реальной реализации здесь будет вызов API)');
    } catch (error) {
      console.error('Error running test:', error);
      alert('Ошибка при выполнении проверки API');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Выполнить проверку API</CardTitle>
          <CardDescription>Введите параметры для проверки API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Метод</label>
              <select
                value={apiMethod}
                onChange={(e) => setApiMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">URL API</label>
              <Input
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Заголовки (JSON)</label>
              <textarea
                value={apiHeaders}
                onChange={(e) => setApiHeaders(e.target.value)}
                placeholder='{"Content-Type": "application/json"}'
                className="w-full p-2 border rounded h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Тело запроса</label>
              <textarea
                value={apiBody}
                onChange={(e) => setApiBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full p-2 border rounded h-24"
              />
            </div>
          </div>
          
          <Button onClick={handleRunTest} className="w-full md:w-auto">
            Выполнить проверку
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История проверок</CardTitle>
          <CardDescription>Предыдущие проверки API</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Загрузка...</p>
          ) : tests.length === 0 ? (
            <p>Нет выполненных проверок</p>
          ) : (
            <div className="space-y-4">
              {tests.map((test) => (
                <TestResultCard key={test.id} test={test} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}