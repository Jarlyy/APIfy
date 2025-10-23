// Типы для пользователя
export interface User {
  id: string;
 email: string;
 name: string;
  createdAt: string;
  updatedAt: string;
}

// Типы для проверки API
export interface APITest {
  id: string;
  userId: string;
  serviceName: string;
  apiEndpoint: string;
 testStatus: 'success' | 'failed' | 'in_progress';
  responseTime: number;
  responseBody: string;
  responseStatus: number;
  createdAt: string;
  updatedAt: string;
}

// Типы для истории проверок
export interface TestHistory {
  id: string;
  testId: string;
  userId: string;
  requestParams: Record<string, any>;
  requestHeaders: Record<string, string>;
  requestMethod: string;
  createdAt: string;
}

// Типы для документации API
export interface APIDocumentation {
  id: string;
  serviceName: string;
  documentationUrl: string;
  endpoints: string[];
  authMethods: string[];
  lastScanned: string;
}

// Типы для результатов поиска API
export interface APISearchResult {
 serviceName: string;
  apiEndpoint: string;
  documentationUrl: string;
  endpoints: string[];
  authMethods: string[];
}