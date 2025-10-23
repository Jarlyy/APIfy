# Структура проекта APIfy

## 1. Обзор структуры

```
apify/
├── docs/                    # Документация проекта
│   ├── PRD-API-Testing-App-2025-10-23.md
│   ├── architecture_plan.md
│   └── project_structure.md
├── src/                     # Исходный код приложения
│   ├── app/                 # Страницы приложения (Next.js 13+ app router)
│   │   ├── layout.tsx       # Основной макет приложения
│   │   ├── page.tsx         # Главная страница
│   │   ├── dashboard/       # Панель управления
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── tests/           # Страницы тестирования
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── profile/         # Профиль пользователя
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── api/             # API маршруты
│   │       ├── auth/
│   │       │   ├── signup/
│   │       │   ├── login/
│   │       │   ├── logout/
│   │       │   └── me/
│   │       ├── tests/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       └── docs/
│   │           └── parse/
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── ui/              # UI компоненты из shadcn
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── forms/           # Формы приложения
│   │   │   ├── api-test-form.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── cards/           # Карточки для отображения данных
│   │   │   ├── test-result-card.tsx
│   │   │   ├── api-info-card.tsx
│   │   │   └── history-card.tsx
│   │   └── navigation/      # Компоненты навигации
│   │       ├── main-nav.tsx
│   │       └── user-nav.tsx
│   ├── lib/                 # Утилиты и библиотеки
│   │   ├── supabase/        # Клиент Supabase
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── types/           # Типы TypeScript
│   │   │   ├── user.ts
│   │   │   ├── api-test.ts
│   │   │   ├── test-history.ts
│   │   │   ├── api-documentation.ts
│   │   │   └── index.ts
│   │   ├── utils/           # Вспомогательные функции
│   │   │   ├── cn.ts
│   │   │   ├── format-date.ts
│   │   │   └── index.ts
│   │   └── constants.ts     # Константы приложения
│   ├── hooks/               # Пользовательские хуки
│   │   ├── use-auth.ts
│   │   ├── use-api-tests.ts
│   │   └── use-documentation.ts
│   ├── services/            # Сервисы для работы с API
│   │   ├── auth-service.ts
│   │   ├── api-test-service.ts
│   │   ├── documentation-service.ts
│   │   └── neural-service.ts
│   └── styles/              # Стили приложения
│       └── globals.css
├── public/                  # Публичные ресурсы
│   ├── favicon.ico
│   ├── logo.svg
│   └── ...
├── .env.example             # Пример переменных окружения
├── .env.local               # Локальные переменные окружения
├── .gitignore               # Файлы, игнорируемые Git
├── next.config.js           # Конфигурация Next.js
├── tailwind.config.js       # Конфигурация Tailwind CSS
├── tsconfig.json            # Конфигурация TypeScript
├── postcss.config.js        # Конфигурация PostCSS
├── components.json          # Конфигурация shadcn/ui
└── package.json             # Зависимости и скрипты проекта
```

## 2. Подробное описание компонентов

### 2.1 Страницы приложения (app/)

#### 2.1.1 Главная страница (page.tsx)
- Поле для ввода названия сервиса
- Кнопка запуска поиска API
- Краткое описание функциональности приложения
- Возможность перехода к регистрации/входу

#### 2.1.2 Панель управления (dashboard/)
- Обзор последних проверок
- Статистика использования
- Быстрый доступ к основным функциям
- Ссылки на историю проверок

#### 2.1.3 Страницы тестирования (tests/)
- Интерфейс для проверки API
- Возможность ввода URL API
- Выбор метода запроса
- Поля для параметров и заголовков
- Отображение результатов проверки

#### 2.1.4 Профиль пользователя (profile/)
- Информация о пользователе
- Настройки аккаунта
- История активности
- Предпочтения

### 2.2 Компоненты (components/)

#### 2.2.1 UI компоненты (ui/)
- Кнопки, инпуты, карточки и другие базовые элементы
- Имплементация компонентов из shadcn/ui
- Стилизованные с использованием Tailwind CSS

#### 2.2.2 Формы (forms/)
- Формы аутентификации (вход, регистрация)
- Форма проверки API
- Формы обновления профиля

#### 2.2.3 Карточки (cards/)
- Карточки для отображения результатов проверок
- Карточки с информацией об API
- Карточки истории проверок

#### 2.2.4 Навигация (navigation/)
- Основная навигация приложения
- Навигация пользователя (профиль, настройки)

### 2.3 Библиотеки (lib/)

#### 2.3.1 Клиент Supabase (supabase/)
- Клиент для работы с Supabase на стороне клиента
- Клиент для работы с Supabase на стороне сервера
- Middleware для защиты маршрутов

#### 2.3.2 Типы (types/)
- TypeScript интерфейсы для всех сущностей
- Типы для запросов и ответов API
- Перечисления для статусов и состояний

#### 2.3.3 Утилиты (utils/)
- Функция для объединения классов (cn)
- Функции форматирования даты и времени
- Другие вспомогательные функции

### 2.4 Хуки (hooks/)

#### 2.4.1 use-auth
- Управление состоянием аутентификации
- Проверка сессии пользователя
- Функции входа и выхода

#### 2.4.2 use-api-tests
- Управление состоянием проверок API
- Функции загрузки и обновления данных
- Обработка результатов проверок

#### 2.4.3 use-documentation
- Управление состоянием документации API
- Функции загрузки и парсинга документации
- Обработка информации из документации

### 2.5 Сервисы (services/)

#### 2.5.1 auth-service
- Функции регистрации и входа
- Управление сессией
- Проверка аутентификации

#### 2.5.2 api-test-service
- Создание и выполнение проверок API
- Сохранение результатов
- Получение истории проверок

#### 2.5.3 documentation-service
- Парсинг документации API
- Извлечение информации из OpenAPI/Swagger
- Извлечение примеров запросов

#### 2.5.4 neural-service
- Интеграция с нейросетевыми API
- Поиск API по названию сервиса
- Анализ документации с помощью ИИ

## 3. Зависимости проекта

### 3.1 Основные зависимости
- next: "^14.0.0" - Фреймворк для React приложений
- react: "^18.2.0" - Библиотека для создания пользовательских интерфейсов
- react-dom: "^18.2.0" - Пакет для рендеринга React в DOM
- @supabase/supabase-js: "^2.38.0" - Клиент для работы с Supabase
- typescript: "^5.0.0" - Язык программирования с типизацией
- tailwindcss: "^3.3.0" - Фреймворк для стилизации
- zod: "^3.22.0" - Библиотека для валидации данных

### 3.2 UI зависимости
- @radix-ui/react-* - Компоненты для доступного UI
- class-variance-authority - Утилита для создания вариантов компонентов
- clsx - Утилита для объединения классов
- lucide-react - Иконки для интерфейса
- @hookform/resolvers - Резолверы для react-hook-form
- react-hook-form - Библиотека для работы с формами

### 3.3 Дополнительные зависимости
- openapi-types - Типы для OpenAPI спецификаций
- swagger-parser - Парсер Swagger/OpenAPI спецификаций
- axios - Библиотека для выполнения HTTP запросов
- @types/swagger-parser - Типы для swagger-parser

## 4. API маршруты

### 4.1 Маршруты аутентификации
- POST /api/auth/signup - Регистрация пользователя
- POST /api/auth/login - Вход пользователя
- POST /api/auth/logout - Выход пользователя
- GET /api/auth/me - Получение информации о пользователе

### 4.2 Маршруты API тестирования
- POST /api/tests - Создание новой проверки API
- GET /api/tests - Получение истории проверок
- GET /api/tests/[id] - Получение деталей конкретной проверки
- POST /api/tests/run - Выполнение проверки API

### 4.3 Маршруты документации
- POST /api/docs/parse - Парсинг документации API
- GET /api/docs/[serviceName] - Получение документации для сервиса

## 5. Переменные окружения

### 5.1 .env.example
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Neural Network (OpenAI or similar)
OPENAI_API_KEY=your_openai_api_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5.2 .env.local
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000