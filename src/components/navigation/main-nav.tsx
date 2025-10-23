'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
 { name: 'Главная', href: '/' },
  { name: 'Проверки', href: '/tests' },
  { name: 'Документация', href: '/docs' },
 { name: 'Профиль', href: '/profile' },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}