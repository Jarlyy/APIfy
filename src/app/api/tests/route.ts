import { NextResponse } from 'next/server';
import { APITest } from '@/lib/types';

// Заглушка для хранения тестов (в реальном приложении использовалась бы база данных)
let tests: APITest[] = [
  {
    id: '1',
    userId: 'user1',
    serviceName: 'Test Service',
    apiEndpoint: 'https://api.test.com/test',
    testStatus: 'success',
    responseTime: 245,
    responseBody: JSON.stringify({ message: 'success', data: { id: 1, name: 'Test' } }),
    responseStatus: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    serviceName: 'Test Service 2',
    apiEndpoint: 'https://api.test.com/test2',
    testStatus: 'failed',
    responseTime: 1500,
    responseBody: JSON.stringify({ error: 'timeout' }),
    responseStatus: 408,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export async function GET() {
  try {
    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tests' }, 
      { status: 500 }
    );
 }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Валидация входных данных
    if (!body.serviceName || !body.apiEndpoint) {
      return NextResponse.json(
        { error: 'serviceName and apiEndpoint are required' },
        { status: 400 }
      );
    }
    
    // Создание нового теста
    const newTest: APITest = {
      id: Math.random().toString(36).substring(2, 9),
      userId: body.userId || 'anonymous',
      serviceName: body.serviceName,
      apiEndpoint: body.apiEndpoint,
      testStatus: 'in_progress',
      responseTime: 0,
      responseBody: '',
      responseStatus: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Добавляем тест в "базу данных"
    tests.push(newTest);
    
    return NextResponse.json({ test: newTest }, { status: 201 });
  } catch (error) {
    console.error('Error creating test:', error);
    return NextResponse.json(
      { error: 'Failed to create test' },
      { status: 500 }
    );
  }
}