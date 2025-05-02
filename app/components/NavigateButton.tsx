"use client";
import { useRouter } from 'next/navigation';

interface NavigateButtonProps {
  href: string;
  children: React.ReactNode;
  className: string;
}

export function NavigateButton({ href, children, className }: NavigateButtonProps) {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push(href)}
      className={className}
    >
      {children}
    </button>
  );
} 