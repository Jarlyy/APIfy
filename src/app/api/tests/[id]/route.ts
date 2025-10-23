import { NextResponse } from 'next/server';
import { APITest } from '@/lib/types';

// Заглушка для хранения тестов (в реальном приложении использовалась бы база данных)
const tests: APITest[] = [
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Поиск теста по ID
    const test = tests.find(t => t.id === id);
    
    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ test });
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test' },
      { status: 500 }
    );
 }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Поиск индекса теста
    const testIndex = tests.findIndex(t => t.id === id);
    
    if (testIndex === -1) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }
    
    // Обновление теста
    tests[testIndex] = {
      ...tests[testIndex],
      ...body,
      id, // Убедимся, что ID не изменится
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ test: tests[testIndex] });
  } catch (error) {
    console.error('Error updating test:', error);
    return NextResponse.json(
      { error: 'Failed to update test' },
      { status: 500 }
    );
 }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Поиск индекса теста
    const testIndex = tests.findIndex(t => t.id === id);
    
    if (testIndex === -1) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }
    
    // Удаление теста
    const deletedTest = tests.splice(testIndex, 1)[0];
    
    return NextResponse.json({ test: deletedTest }, { status: 200 });
  } catch (error) {
    console.error('Error deleting test:', error);
    return NextResponse.json(
      { error: 'Failed to delete test' },
      { status: 500 }
    );
  }
}