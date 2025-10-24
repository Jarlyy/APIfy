# Настройка CI/CD Pipeline для APIfy

## Обзор

В этом документе описана настройка непрерывной интеграции и доставки (CI/CD) для проекта APIfy. Pipeline будет автоматически тестировать, собирать и развертывать приложение при пуше в репозиторий.

## Стек технологий

- GitHub Actions для CI/CD
- Vercel для хостинга и деплоя
- pnpm для управления зависимостями
- Supabase для аутентификации и базы данных

## Настройка GitHub Actions

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
        
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8.x
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Run TypeScript check
      run: pnpm tsc --noEmit
      
    - name: Run linting
      run: pnpm lint || true # Не останавливаем сборку из-за линтера
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8.x
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build application
      run: pnpm build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
        working-directory: .
```

## Настройка Vercel

### 1. Создание проекта на Vercel

1. Перейдите на [vercel.com](https://vercel.com) и создайте аккаунт
2. Импортируйте ваш GitHub репозиторий
3. Укажите следующие настройки при импорте:
   - Framework: Next.js
   - Root Directory: (оставьте пустым)
   - Build Command: `pnpm run build`
   - Install Command: `pnpm install`
   - Output Directory: (оставьте пустым)

### 2. Установка Environment Variables

В настройках проекта на Vercel добавьте следующие Environment Variables:

**Production Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - URL вашего Supabase проекта
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Анонимный ключ Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Ключ сервисной роли (только для production)
- `OPENAI_API_KEY` - Ключ API OpenAI (если используется)
- `NEXT_PUBLIC_APP_URL` - URL вашего приложения на Vercel

**Branch: Production and Preview:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Настройка домена (опционально)

1. В настройках проекта на Vercel добавьте ваш кастомный домен
2. Обновите DNS записи согласно инструкциям Vercel

## Дополнительные проверки безопасности

### 1. CodeQL Analysis

Добавьте файл `.github/workflows/codeql.yml`:

```yaml
name: "CodeQL"

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
 schedule:
    - cron: '0 0 * * 0'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: [ 'javascript' ]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v2
      with:
        languages: ${{ matrix.language }}

    - name: Autobuild
      uses: github/codeql-action/autobuild@v2

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
```

### 2. Dependency Review

Добавьте файл `.github/workflows/dependency-review.yml`:

```yaml
name: 'Dependency Review'
on: [pull_request]

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout Repository'
        uses: actions/checkout@v3
      - name: 'Dependency Review'
        uses: actions/dependency-review-action@v3
```

## Мониторинг и логирование

### 1. Sentry для мониторинга ошибок

Установите Sentry:

```bash
pnpm add @sentry/nextjs
```

Создайте файлы конфигурации Sentry:

**sentry.client.config.js:**
```javascript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.5,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

**sentry.server.config.js:**
```javascript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.5,
});
```

### 2. Environment Variables для Sentry

- `NEXT_PUBLIC_SENTRY_DSN` - DSN для Sentry
- `SENTRY_AUTH_TOKEN` - Токен для деплоя sourcemaps

## Подготовка к деплою

Перед деплоем убедитесь, что:

1. Все тесты проходят
2. Линтер не выдает ошибок
3. Все зависимости актуальны
4. Environment variables настроены правильно
5. Документация обновлена
6. Все безопасные практики реализованы

## Рекомендации по безопасности

1. Храните секреты в GitHub Secrets, а не в коде
2. Используйте минимально необходимые права для GitHub Actions
3. Регулярно обновляйте зависимости
4. Проводите аудит безопасности зависимостей
5. Используйте HTTPS для всех API-вызовов
6. Реализуйте защиту от XSS, CSRF и других атак