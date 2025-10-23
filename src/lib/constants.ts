// Константы приложения APIfy

// URL-адреса
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Коды состояния HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Статусы проверок API
export const TEST_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
} as const;

// Методы HTTP
export const HTTP_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const;

// Типы аутентификации
export const AUTH_METHODS = [
  'API Key',
  'Bearer Token',
  'OAuth 2.0',
  'Basic Auth',
] as const;

// Типы контента
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  TEXT: 'text/plain',
} as const;