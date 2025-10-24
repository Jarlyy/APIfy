import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'APIfy - API Testing Application',
  description: 'An application for testing API services using neural network technology',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="text-xl font-bold">APIfy</div>
              <nav className="hidden md:flex">
                <ul className="flex space-x-6">
                  <li><a href="/" className="text-sm font-medium hover:text-primary">Главная</a></li>
                  <li><a href="/tests" className="text-sm font-medium hover:text-primary">Проверки</a></li>
                  <li><a href="/docs" className="text-sm font-medium hover:text-primary">Документация</a></li>
                  <li><a href="/profile" className="text-sm font-medium hover:text-primary">Профиль</a></li>
                </ul>
              </nav>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} APIfy - Платформа для тестирования API
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}