import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Документация API</CardTitle>
          <CardDescription>
            Информация о доступных API и их использовании
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Введение</h2>
              <p className="mb-4">
                APIfy - это платформа для проверки работоспособности API-сервисов с использованием нейросетевых технологий. 
                Наша платформа позволяет находить API по названию сервиса, анализировать документацию и выполнять проверки.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Поиск API</h2>
              <p className="mb-2">Наша нейросетевая модель может находить API по названию сервиса.</p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Примеры запросов:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>GitHub</li>
                  <li>Twitter / X</li>
                  <li>Stripe</li>
                  <li>Google Maps</li>
                  <li>OpenWeatherMap</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Проверка API</h2>
              <p className="mb-2">
                После нахождения API вы можете выполнить различные проверки:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Проверка доступности и времени отклика</li>
                <li>Проверка корректности ответов</li>
                <li>Проверка методов аутентификации</li>
                <li>Анализ производительности</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Интеграция</h2>
              <p>
                Вы можете интегрировать нашу платформу ваш CI/CD процесс для автоматического тестирования API.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}