import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Получаем сессию пользователя
  const { data: { session } } = await supabase.auth.getSession();

  // Защищаем определенные маршруты
  const protectedPaths = ['/profile', '/tests', '/api/tests'];
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
  
  if (isProtectedPath && !session) {
    // Перенаправляем на страницу входа, если пользователь не авторизован
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

 // Проверяем ограничения по частоте запросов для API маршрутов
  if (req.nextUrl.pathname.startsWith('/api/')) {
    // Здесь можно добавить логику ограничения частоты запросов
    // Пока что просто добавляем заголовки безопасности
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-XSS-Protection', '1; mode=block');
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Сопоставляем все пути, кроме тех, что начинаются с:
     * - api (исключаем /api/auth как исключение)
     * - _next/static (статические файлы)
     * - _next/image (файлы оптимизации изображений)
     * - favicon.ico (файл иконки)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};