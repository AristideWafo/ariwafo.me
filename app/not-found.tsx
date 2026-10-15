import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="label-accent">Error 404</p>
          <h1 className="display mt-4 text-4xl sm:text-5xl">Not found</h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            This route does not resolve. The page may have moved, or the link
            that sent you here was wrong.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="secondary">
              Back home
            </Button>
            <Button href="/projects" variant="outline">
              See the projects
            </Button>
          </div>
          <p className="mt-8">
            <Link href="/contact" className="link-underline text-sm">
              Tell me what you were looking for
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
