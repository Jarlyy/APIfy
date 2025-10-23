import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APITest } from '@/lib/types';

interface TestResultCardProps {
  test: APITest;
}

export default function TestResultCard({ test }: TestResultCardProps) {
  const getStatusColor = () => {
    switch (test.testStatus) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-90 dark:text-red-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{test.serviceName}</CardTitle>
            <CardDescription className="mt-1 break-all">{test.apiEndpoint}</CardDescription>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
            {test.testStatus === 'success' ? 'Успешно' : test.testStatus === 'failed' ? 'Ошибка' : 'В процессе'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Статус ответа</p>
            <p className="font-medium">{test.responseStatus}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Время отклика</p>
            <p className="font-medium">{test.responseTime} мс</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 dark:text-gray-400">Дата проверки</p>
            <p className="font-medium">{new Date(test.createdAt).toLocaleString()}</p>
          </div>
          {test.responseBody && (
            <div className="col-span-2">
              <p className="text-gray-600 dark:text-gray-400">Ответ API</p>
              <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                {JSON.stringify(JSON.parse(test.responseBody), null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}