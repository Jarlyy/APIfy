import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APITest } from '@/lib/types';

// В реальной реализации здесь будет получение данных из API или базы данных
// Пока используем заглушку
const getTestById = async (id: string): Promise<APITest | null> => {
  // Имитация задержки для асинхронной операции
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Возвращаем тест с указанным ID или null, если тест не найден
  if (id === '1') {
    return {
      id: '1',
      userId: 'user1',
      serviceName: 'Test Service',
      apiEndpoint: 'https://api.test.com/test',
      testStatus: 'success',
      responseTime: 245,
      responseBody: JSON.stringify({ message: 'success', data: { id: 1, name: 'Test' } }, null, 2),
      responseStatus: 200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  return null;
};

export default async function TestDetailPage({ params }: { params: { id: string } }) {
  const test = await getTestById(params.id);
  
  if (!test) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Детали проверки API</CardTitle>
          <CardDescription>
            Подробная информация о проверке для {test.serviceName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-600 dark:text-gray-400">Статус</h3>
              <p className={`text-lg font-semibold ${
                test.testStatus === 'success' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {test.testStatus === 'success' ? 'Успешно' : 'Ошибка'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-600 dark:text-gray-40">Время отклика</h3>
              <p className="text-lg font-semibold">{test.responseTime} мс</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-600 dark:text-gray-400">Код ответа</h3>
              <p className="text-lg font-semibold">{test.responseStatus}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">API Endpoint</h3>
            <p className="break-all p-2 bg-gray-50 dark:bg-gray-800 rounded">{test.apiEndpoint}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Заголовки запроса</h3>
            <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded text-sm overflow-x-auto">
              {JSON.stringify({
                'Content-Type': 'application/json',
                'User-Agent': 'APIfy Test Client'
              }, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Тело ответа</h3>
            <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded text-sm overflow-x-auto">
              {test.responseBody}
            </pre>
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Дата создания</p>
              <p>{new Date(test.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Последнее обновление</p>
              <p>{new Date(test.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}