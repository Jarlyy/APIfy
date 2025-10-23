import { NextResponse } from 'next/server';
import { APITest } from '@/lib/types';
import apiTestService from '@/services/api-test-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Валидация входных данных
    if (!body.url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }
    
    const { url, method = 'GET', headers = {}, params = {}, body: requestBody = null } = body;
    
    // Выполнение проверки API
    const result = await apiTestService.runAPITest({
      url,
      method,
      headers,
      params,
      body: requestBody,
    });
    
    // Создание объекта теста с результатами
    const test: APITest = {
      id: Math.random().toString(36).substring(2, 9),
      userId: body.userId || 'anonymous',
      serviceName: body.serviceName || 'Unknown Service',
      apiEndpoint: url,
      testStatus: result.status >= 200 && result.status < 300 ? 'success' : 'failed',
      responseTime: result.responseTime,
      responseBody: JSON.stringify(result.data),
      responseStatus: result.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ test }, { status: 200 });
  } catch (error) {
    console.error('Error running API test:', error);
    return NextResponse.json(
      { error: 'Failed to run API test' },
      { status: 500 }
    );
  }
}