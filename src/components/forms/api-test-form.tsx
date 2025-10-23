'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APITest } from '@/lib/types';

interface APITestFormProps {
  onTestComplete?: (test: APITest) => void;
}

export default function APITestForm({ onTestComplete }: APITestFormProps) {
  const [apiUrl, setApiUrl] = useState('');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiHeaders, setApiHeaders] = useState('{}');
  const [apiBody, setApiBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Проверяем, что URL валиден
      if (!apiUrl) {
        alert('Пожалуйста, введите URL API');
        return;
      }

      // Пытаемся распарсить заголовки как JSON
      let headersObj = {};
      if (apiHeaders.trim()) {
        try {
          headersObj = JSON.parse(apiHeaders);
        } catch (e) {
          alert('Заголовки должны быть валидным JSON');
          return;
        }
      }

      // Выполняем тест API
      const response = await fetch('/api/tests/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: apiUrl,
          method: apiMethod,
          headers: headersObj,
          body: apiBody ? JSON.parse(apiBody) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to run API test');
      }

      // Вызываем колбэк с результатом теста
      if (onTestComplete) {
        onTestComplete(data.test);
      }

      // Сбрасываем форму
      setApiUrl('');
      setApiHeaders('{}');
      setApiBody('');
    } catch (error: any) {
      alert(error.message || 'An error occurred while running the API test');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Выполнить проверку API</CardTitle>
        <CardDescription>Введите параметры для проверки API</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="method" className="block text-sm font-medium mb-1">
                Метод
              </label>
              <select
                id="method"
                value={apiMethod}
                onChange={(e) => setApiMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label htmlFor="url" className="block text-sm font-medium mb-1">
                URL API
              </label>
              <Input
                id="url"
                type="url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="headers" className="block text-sm font-medium mb-1">
                Заголовки (JSON)
              </label>
              <textarea
                id="headers"
                value={apiHeaders}
                onChange={(e) => setApiHeaders(e.target.value)}
                placeholder='{"Content-Type": "application/json"}'
                className="w-full p-2 border rounded h-24 font-mono text-sm"
              />
            </div>
            <div>
              <label htmlFor="body" className="block text-sm font-medium mb-1">
                Тело запроса (JSON)
              </label>
              <textarea
                id="body"
                value={apiBody}
                onChange={(e) => setApiBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full p-2 border rounded h-24 font-mono text-sm"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            {loading ? 'Выполняется проверка...' : 'Выполнить проверку'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}