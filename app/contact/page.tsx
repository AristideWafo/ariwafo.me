import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteProfile } from "@/lib/content/site";
import Link from "next/link";
import { LinkedinIcon } from "../../public/icons/LinkedinIcon";

export const metadata: Metadata = {
  title: "Contact - Aristide WAFO",
  description:
    "Contactez-moi pour vos projets d'infrastructure cloud, collaborations DevOps ou discussions techniques.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      {/* <Section>
        <div className="space-y-4 pt-0">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Travaillons Ensemblee
          </h1>
          <p className="text-muted-foreground text-lg md:w-3/4 leading-relaxed">
            Intéressé par l&apos;infrastructure cloud, l&apos;automatisation
            DevOps, ou une collaboration technique ? J&apos;aimerais en savoir
            plus sur votre projet.
          </p>
        </div>
      </Section> */}
      <Section className="pb-0 md:pb-0">
        {/* <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            <span>Retour</span>
          </Link>
        </div> */}

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Travaillons Ensemble
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Intéressé par l&apos;infrastructure cloud, l&apos;automatisation
            DevOps, ou une collaboration technique ? J&apos;aimerais en savoir
            plus sur votre projet.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contactez-moi</h2>
              <div className="space-y-4">
                {/* Email */}
                {/* <div className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors group">
                  <div className="flex items-start gap-3">
                    <EmailIcon
                      size={20}
                      className="text-muted-foreground group-hover:text-foreground transition-colors mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Email</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Pour les demandes de projet et collaborations
                      </p>
                      <Link
                        href={`mailto:${siteProfile.email}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                      >
                        Envoyer un email
                      </Link>
                    </div>
                  </div>
                </div> */}

                {/* LinkedIn */}
                <div className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors group">
                  <div className="flex items-start gap-3">
                    <LinkedinIcon
                      size={20}
                      className="text-muted-foreground group-hover:text-foreground transition-colors mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">LinkedIn</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Réseau professionnel et messages rapides
                      </p>
                      <Link
                        href={
                          siteProfile.socials.find(
                            (s) => s.label === "LinkedIn"
                          )?.href || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                      >
                        Se connecter sur LinkedIn
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Calendar - placeholder */}
                <div className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors group">
                  <div className="flex items-start gap-3">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors mt-1 text-lg">
                      📅
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Planifier un appel</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Réservez une discussion technique de 30 minutes
                      </p>
                      <Link
                        href={`mailto:${siteProfile.email}?subject=Demande de rendez-vous`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                      >
                        Demander un créneau
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span>⏱️</span>
                Temps de réponse
              </h3>
              <p className="text-muted-foreground text-sm">
                Je réponds généralement dans les 24-48 heures pendant les jours
                ouvrables.
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Envoyer un message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Questions fréquentes</h2>
          <div className="grid gap-4">
            <div className="p-4 rounded-lg border border-border/60 hover:bg-muted/20 transition-colors">
              <h3 className="font-medium mb-2">
                Sur quels types de projets travaillez-vous ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Infrastructure cloud, automatisation DevOps, pipelines CI/CD, et
                projets Infrastructure as Code (Terraform, AWS CDK).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/60 hover:bg-muted/20 transition-colors">
              <h3 className="font-medium mb-2">
                Proposez-vous des services de conseil ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Oui, je fournis du conseil technique pour l&apos;architecture
                cloud et les bonnes pratiques DevOps.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/60 hover:bg-muted/20 transition-colors">
              <h3 className="font-medium mb-2">
                Quelle est votre disponibilité ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Actuellement ouvert aux nouveaux projets et collaborations.
                Contactez-moi pour discuter des délais.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/60 hover:bg-muted/20 transition-colors">
              <h3 className="font-medium mb-2">Travaillez-vous en remote ?</h3>
              <p className="text-muted-foreground text-sm">
                Oui, je travaille principalement en remote avec possibilité de
                déplacements selon les besoins du projet.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
