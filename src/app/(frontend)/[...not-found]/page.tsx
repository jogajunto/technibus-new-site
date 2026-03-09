import { Button } from "@/components/Button";
import { createMetadata } from "@/utilities/create-metadata";
import Link from "next/link";

export function generateMetadata() {
  return createMetadata({
    path: "/",
    title: "Página não encontrada",
    description: "A URL acessada não foi localizada. Navegue pela página inicial para encontrar conteúdos relevantes e atualizados.",
  });
}

export default function NotFound() {
  return (
    <main>
      <section className="grid items-center justify-center py-24">
        <div className="container max-w-xl">
          <div className="space-y-4 text-center text-balance">
            <h1 className="subheading text-brand-primary">Página não encontrada</h1>
            <p className="subtitle">A página que você procura pode ter sido removida, renomeada ou está temporariamente indisponível.</p>
            <Button asChild>
              <Link href="/">Voltar para página inicial</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
