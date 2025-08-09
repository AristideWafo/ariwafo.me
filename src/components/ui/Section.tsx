import React, { PropsWithChildren } from 'react';
import { Container } from './Container';
import { cn } from '@/lib/utils';

export function Section({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn('py-12 md:py-16', className)}>
      <Container>{children}</Container>
    </section>
  );
}
