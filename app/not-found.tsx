import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">The resource you are looking for does not exist. This is placeholder content.</p>
      <p>
        <Link href="/" className="underline underline-offset-4 hover:text-primary">Return home</Link>
      </p>
    </main>
  );
}
