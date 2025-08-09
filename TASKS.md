# TASKS.md — Checklist exhaustive (à cocher)

## 0) Préparation du projet (one-shot avant les pages)
  - [x] Rayons (sm, md, xl, 2xl), ombres douces, container centré.
  - [x] Échelles d’espacement cohérentes (4/8/12/16/24/32).
- [x] Créer la structure dossiers :

```
src/app/(site)/
src/components/ui/
src/components/sections/
src/lib/seo/
src/lib/content/
public/images/
content/articles/
content/podcasts/
content/cases/
```

- [x] Modifier le layout global `src/app/layout.tsx` (HTML lang="en", meta de base, Typography).
- [x] modifier header sticky (logo texte, nav primaire) et footer (liens, mentions).
- [x] Composants UI réutilisables :
  - [x] Container, Section, Button (variants), Badge, Card, Prose, Kpi (metric), Breadcrumbs, Pagination, Tag.
  - [x] Grid.
- [x] Utilitaires :
  - [x] Helper SEO (buildMeta, OpenGraph/OG).
  - [x] Page 404 sobre et utile.
- [x] README avec scripts, structure, conventions de commit.
- [x] CI GitHub Actions (lint + build) et vérification Lighthouse manuelle ou action (audit à faire après pages).

**Definition of Ready pages** : style minimal type lndev.me, responsive ≥ 320px, contrast AA, perf Lighthouse cible ≥ 90.

---

## 1) Page Accueil (`/`)
### Sections à livrer
- [x] Hero : Titre, sous-titre, 2 CTA (Contact, Étude de cas).
- [x] Preuves rapides : Certifs (AWS SAA-C03, Terraform Associate), 1–2 metrics (placeholders), lien cas phare. /* metrics placeholders only (certs & link pending) */
- [x] Valeur en 3 piliers : IaC/Terraform, CI/CD, Sécurité/Observabilité.
- [x] Teaser Études de cas : 2–3 cartes (placeholders).
- [x] Stack/outillage : liste textuelle sobre (AWS, Terraform, GitHub Actions, Docker, CloudWatch).
- [x] Derniers contenus : 1 article + 1 épisode podcast (placeholders).
- [x] Bandeau contact final avec CTA.

### Tâches
- [x] `src/app/(site)/page.tsx` avec sections modulaires `components/sections/home/*`.
- [x] Implémenter Hero sans images lourdes, typographie forte, CTA `Link`.
- [x] Composant `Kpi` pour preuves (valeur + libellé + note).
- [x] Cartes teasers (Card + Tag).
- [x] Section “Derniers contenus” branchée sur placeholders (`src/lib/content`).
- [x] SEO spécifique : title, description, OG, canonical.
- [ ] Tests manuels : responsive, tab order, landmarks, contrastes.
- [ ] Déployer preview, coller l’URL en commentaire PR.
- [ ] Ajouter scores Lighthouse (Desktop/Mobile) ici.

### Definition of Done (Accueil)
- [ ] Build sans warnings, Lighthouse ≥ 90 (perf, accessibilité, SEO, best practices).
- [ ] Pas d’icône/emoji, pas d’images superflues, CLS stable.
- [ ] Notification client : “Accueil terminé, prêt pour contenu final”.

**STOP & NOTIFY après Achèvement Accueil.**

---

## 2) Page À propos (`/a-propos`)
### Sections
- [ ] Bio courte et positionnement.
- [ ] Parcours backend → cloud (paragraphe).
- [ ] Méthode de travail (IaC-first, CI/CD, tests infra, sécurité by design, métriques).
- [ ] Compétences & outils (liste).
- [ ] Certifications (badges textuels + placeholders d’ID).
- [ ] Mini-FAQ (3–4 questions).
- [ ] CTA vers Études de cas.

### Tâches
- [ ] `app/(site)/a-propos/page.tsx`.
- [ ] Grille 1–2 colonnes, lecture confortable (Prose).
- [ ] BreadCrumbs.
- [ ] SEO dédié.
- [ ] Tests responsive/a11y + preview + scores Lighthouse.

### Definition of Done (À propos)
- [ ] Lecture fluide, contraste AA, navigation cohérente.
- [ ] Notification client.

**STOP & NOTIFY après Achèvement À propos.**

---

## 3) Page Contact (`/contact`)
### Sections
- [ ] Formulaire (nom, email, message).
- [ ] Lien Calendly (placeholder).
- [ ] Coordonnées (email pro, mention “remote”).
- [ ] Bandeau confiance (2 témoignages placeholders).

### Tâches
- [ ] `app/(site)/contact/page.tsx`.
- [ ] Formulaire accessible (labels, `aria-invalid`, messages d’erreur).
- [ ] Server Action envoyant vers placeholder (console).
- [ ] Anti-spam (honeypot, délai).
- [ ] Page de succès (`/contact/succes`).
- [ ] SEO + tests + preview + scores Lighthouse.

### Definition of Done (Contact)
- [ ] Formulaire utilisable au clavier, feedbacks d’erreur visibles.
- [ ] Notification client.

**STOP & NOTIFY après Achèvement Contact.**

---

## 4) Page Articles (liste + détail)

### Système de contenu
- [ ] Contentlayer + MDX pour `content/articles`.
- [ ] Frontmatter : `title`, `date`, `description`, `tags`, `readingTime`, `published`.
- [ ] Styles MDX via `Prose`.

### Liste (`/articles`)
- [ ] Grille/liste, filtre par tag, pagination.
- [ ] `ArticleCard` : titre, extrait, date, temps de lecture, tags.

### Détail (`/articles/[slug]`)
- [ ] Template article MDX, sommaire optionnel, prev/next.

### Tâches
- [ ] Installer/configurer Contentlayer.
- [ ] 3 MDX placeholders.
- [ ] SEO (list + détail), RSS (`/rss.xml`).
- [ ] Tests + preview + scores Lighthouse.

### Definition of Done (Articles)
- [ ] Rendu MDX propre, navigation tags OK.
- [ ] Notification client.

**STOP & NOTIFY après Achèvement Articles.**

---

## 5) Page Podcast (liste + détail/épisode)

### Données
- [ ] Source locale JSON/TS `podcasts.ts` ou MDX (placeholders).
- [ ] Champs : `title`, `date`, `summary`, `duration`, `links` (Spotify/Apple placeholders).

### Liste (`/podcast`)
- [ ] `EpisodeCard` : titre, résumé, durée, bouton “Écouter”.

### Détail (`/podcast/[slug]`) — optionnel si embed
- [ ] Page avec lecteur embarqué (iframe placeholder), notes d’épisode.

### Tâches
- [ ] Créer pages, cartes, routing.
- [ ] SEO list/détail.
- [ ] Tests responsive/a11y, preview, scores Lighthouse.

### Definition of Done (Podcast)
- [ ] Episodes listés, un épisode s’affiche proprement.
- [ ] Notification client.

**STOP & NOTIFY après Achèvement Podcast.**

---

## 6) Page Études de cas (liste + modèle détail)

### Système de contenu
- [ ] MDX dans `content/cases` frontmatter :
  - `title`, `sector`, `scope`, `stack`, `results` (array), `date`, `status`.

### Liste (`/etudes-de-cas`)
- [ ] Filtres par thème (Conteneurs, Serverless, Réseau/Sécu, CI/CD, FinOps).
- [ ] `CaseCard` : titre, contexte court, 1 résultat clé.

### Détail (`/etudes-de-cas/[slug]`)
- [ ] En un coup d’œil (tableau sector/scope/stack/results).
- [ ] Contexte & objectif.
- [ ] Architecture (placeholder schéma, texte).
- [ ] IaC & CI/CD.
- [ ] Sécurité & Observabilité.
- [ ] Résultats (table Avant/Après).
- [ ] Leçons & suites.
- [ ] Ressources (liens placeholder).
- [ ] CTA final.

### Tâches
- [ ] Config Contentlayer pour `cases`.
- [ ] 2 MDX placeholders.
- [ ] SEO list/détail, tests, preview, scores Lighthouse.

### Definition of Done (Études de cas)
- [ ] Navigation liste ↔ détail, structure conforme.
- [ ] Notification finale.

---

## 7) Transverses de fin
- [ ] Vérifier performances (Lighthouse), accessibilité (landmarks, labels, contrastes).
- [ ] Vérifier 404, liens brisés, H1/H2 uniques par page.
- [ ] Générer `REPORT.md` (scores Lighthouse + liens Vercel).
- [ ] Mettre à jour `README` (comment ajouter article, épisode, étude de cas).
- [ ] Marquer toutes les cases faites dans `TASKS.md`.
