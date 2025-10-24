import { NextResponse } from 'next/server';
import { APIDocumentation } from '@/lib/types';
import SwaggerParser from '@apidevtools/swagger-parser';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Валидация входных данных
    if (!body.documentationUrl) {
      return NextResponse.json(
        { error: 'documentationUrl is required' },
        { status: 400 }
      );
    }
    
    const { documentationUrl } = body;
    
    try {
      // Парсинг OpenAPI/Swagger документации с помощью SwaggerParser
      const apiSpec = await SwaggerParser.dereference(documentationUrl);
      
      // Извлечение информации из спецификации
      const endpoints: string[] = [];
      if (apiSpec.paths) {
        for (const [path, methods] of Object.entries(apiSpec.paths)) {
          for (const method of Object.keys(methods as object)) {
            if (['get', 'post', 'put', 'delete', 'patch', 'head', 'options'].includes(method.toLowerCase())) {
              endpoints.push(`${method.toUpperCase()} ${path}`);
            }
          }
        }
      }
      
      // Извлечение информации об аутентификации
      const authMethods: string[] = [];
      // Приводим apiSpec к типу any для обхода проблем с типизацией
      const typedSpec: any = apiSpec;
      
      if (typedSpec.components && typedSpec.components.securitySchemes) {
        for (const [schemeName, scheme] of Object.entries(typedSpec.components.securitySchemes)) {
          const securityScheme: any = scheme;
          switch (securityScheme.type) {
            case 'apiKey':
              authMethods.push(`API Key (${securityScheme.name} in ${securityScheme.in})`);
              break;
            case 'http':
              authMethods.push(`HTTP ${securityScheme.scheme}`);
              break;
            case 'oauth2':
              authMethods.push('OAuth 2.0');
              break;
            case 'openIdConnect':
              authMethods.push('OpenID Connect');
              break;
            default:
              authMethods.push(securityScheme.type);
          }
        }
      } else if (typedSpec.security && Array.isArray(typedSpec.security)) {
        for (const security of typedSpec.security) {
          authMethods.push(...Object.keys(security));
        }
      }
      
      // Создание объекта документации
      const documentation: APIDocumentation = {
        id: Math.random().toString(36).substring(2, 9),
        serviceName: apiSpec.info?.title || 'Unknown Service',
        documentationUrl,
        endpoints,
        authMethods: Array.from(new Set(authMethods)), // Уникальные методы аутентификации
        lastScanned: new Date().toISOString(),
      };
      
      return NextResponse.json({ documentation });
    } catch (parseError) {
      console.error('Error parsing documentation:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse documentation', details: parseError instanceof Error ? parseError.message : 'Unknown error' },
        { status: 400 }
      );
    }
 } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json(
      { error: 'Failed to parse request' },
      { status: 500 }
    );
  }
}