# Документация к API проекта APIfy

## Обзор

APIfy предоставляет RESTful API для проверки работоспособности API-сервисов. Ниже приведена документация к основным API-маршрутам приложения.

## Базовый URL

Все API-запросы делаются к базовому URL: `https://your-deployed-app.vercel.app/api/`

## Аутентификация

Для доступа к защищенным маршрутам API используется сессия Supabase. При выполнении запросов из браузера сессия передается автоматически через cookies.

## Маршруты API

### Аутентификация

#### POST /api/auth/signup

Регистрация нового пользователя.

**Тело запроса:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

**Ответ:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

#### POST /api/auth/login

Вход пользователя в систему.

**Тело запроса:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Ответ:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

#### POST /api/auth/logout

Выход пользователя из системы.

**Ответ:**
```json
{
 "success": true
}
```

#### GET /api/auth/me

Получение информации о текущем пользователе.

**Ответ:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

### Работа с тестами API

#### GET /api/tests

Получение списка тестов пользователя.

**Ответ:**
```json
{
 "tests": [
    {
      "id": "string",
      "userId": "string",
      "serviceName": "string",
      "apiEndpoint": "string",
      "testStatus": "success | failed | in_progress",
      "responseTime": "number",
      "responseBody": "string",
      "responseStatus": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### POST /api/tests

Создание нового теста.

**Тело запроса:**
```json
{
  "userId": "string",
  "serviceName": "string",
  "apiEndpoint": "string"
}
```

**Ответ:**
```json
{
 "test": {
    "id": "string",
    "userId": "string",
    "serviceName": "string",
    "apiEndpoint": "string",
    "testStatus": "success | failed | in_progress",
    "responseTime": 0,
    "responseBody": "",
    "responseStatus": 0,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### GET /api/tests/:id

Получение информации о конкретном тесте.

**Ответ:**
```json
{
  "test": {
    "id": "string",
    "userId": "string",
    "serviceName": "string",
    "apiEndpoint": "string",
    "testStatus": "success | failed | in_progress",
    "responseTime": "number",
    "responseBody": "string",
    "responseStatus": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### PUT /api/tests/:id

Обновление информации о тесте.

**Тело запроса:**
```json
{
  "serviceName": "string",
  "apiEndpoint": "string",
  "testStatus": "string",
  "responseTime": "number",
  "responseBody": "string",
  "responseStatus": "number"
}
```

**Ответ:**
```json
{
  "test": {
    "id": "string",
    "userId": "string",
    "serviceName": "string",
    "apiEndpoint": "string",
    "testStatus": "success | failed | in_progress",
    "responseTime": "number",
    "responseBody": "string",
    "responseStatus": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### DELETE /api/tests/:id

Удаление теста.

**Ответ:**
```json
{
  "test": {
    "id": "string",
    "userId": "string",
    "serviceName": "string",
    "apiEndpoint": "string",
    "testStatus": "success | failed | in_progress",
    "responseTime": "number",
    "responseBody": "string",
    "responseStatus": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### POST /api/tests/run

Выполнение проверки API.

**Тело запроса:**
```json
{
  "url": "string",
  "method": "GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS",
  "headers": {
    "headerName": "headerValue"
  },
  "params": {
    "paramName": "paramValue"
  },
  "body": {}
}
```

**Ответ:**
```json
{
  "test": {
    "id": "string",
    "userId": "string",
    "serviceName": "string",
    "apiEndpoint": "string",
    "testStatus": "success | failed | in_progress",
    "responseTime": "number",
    "responseBody": "string",
    "responseStatus": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Парсинг документации

#### POST /api/docs/parse

Парсинг документации API.

**Тело запроса:**
```json
{
  "documentationUrl": "string"
}
```

**Ответ:**
```json
{
  "documentation": {
    "id": "string",
    "serviceName": "string",
    "documentationUrl": "string",
    "endpoints": ["string"],
    "authMethods": ["string"],
    "lastScanned": "string"
  }
}
```

## Ошибки

Все API-ответы, содержащие ошибки, возвращаются с соответствующим HTTP-кодом и телом в формате:

```json
{
  "error": "string"
}
```

## Безопасность

- Все API-маршруты защищены с использованием сессии Supabase
- Доступ к защищенным маршрутам требует аутентификации
- Реализована защита от XSS и CSRF атак
- Добавлены заголовки безопасности в middleware