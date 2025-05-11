import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LangChat',
  description: 'A modern chat application',
};

export default function MetadataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 