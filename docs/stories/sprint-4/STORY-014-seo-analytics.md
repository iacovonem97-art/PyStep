# STORY-014: SEO, Meta tags et Analytics

> **Status** : Done
> **Sprint** : 4
> **Epic** : 3 - Lancement MVP
> **PRD Reference** : Section 6 (Criteres de lancement MVP)
> **Points** : 3
> **Assignee** : Amelia
> **Depends on** : Aucune (parallelisable avec STORY-012)

---

## User Story

**En tant que** Product Owner,
**Je veux** que le site soit optimise pour le referencement et equipe d'analytics,
**Afin de** mesurer le trafic et apparaitre dans les moteurs de recherche des le lancement.

---

## Acceptance Criteria

### AC-1: Meta tags HTML
- [x]`<title>` unique et descriptif sur chaque page
- [x]`<meta name="description">` sur chaque page
- [x]`<meta name="viewport">` present (deja le cas via Vite)
- [x]Langue declaree : `<html lang="fr">`

### AC-2: Open Graph (partage reseaux sociaux)
- [x]`og:title`, `og:description`, `og:type`, `og:url` sur la page d'accueil
- [x]`og:image` avec une image de preview (a creer ou placeholder)
- [x]`twitter:card`, `twitter:title`, `twitter:description`

### AC-3: SEO technique
- [x]`robots.txt` a la racine (autoriser tous les crawlers)
- [x]`sitemap.xml` genere avec les pages principales
- [x]URLs propres et semantiques (deja le cas avec React Router)
- [x]Pas de contenu duplique

### AC-4: Analytics
- [x]Script Plausible Analytics integre (CDN, gratuit self-host ou cloud)
- [x]Tracking des page views automatique (SPA-friendly)
- [x]Pas de cookies (Plausible est cookieless = pas de banniere RGPD)
- [x]Script charge en `async defer` pour ne pas impacter la performance

### AC-5: Performance
- [x]Lighthouse Performance score > 90
- [x]Lighthouse SEO score > 90
- [x]Lighthouse Accessibility score > 85
- [x]Temps de chargement < 3s sur 3G simule

### AC-6: Page 404
- [x]Route catch-all pour les URLs invalides
- [x]Page 404 avec message amical et lien vers l'accueil
- [x]Design coherent avec le reste du site

---

## Technical Tasks

### T1: Meta tags dynamiques
- [x]Installer `react-helmet-async` (ou utiliser le document head directement)
- [x]Creer un composant `SEOHead` reutilisable
- [x]Configurer les meta tags par defaut dans `index.html`
- [x]Ajouter les meta tags dynamiques sur les pages principales (Home, Dashboard, Course, Lesson)
- [x]Test: chaque page a un title unique

### T2: Open Graph
- [x]Ajouter les tags OG dans `index.html` (valeurs par defaut)
- [x]Creer ou trouver une image OG (1200x630px) pour le partage
- [x]Placer l'image dans `public/og-image.png`
- [x]Ajouter les tags Twitter Card

### T3: SEO technique
- [x]Creer `public/robots.txt`
- [x]Creer `public/sitemap.xml` (statique, avec les pages principales)
- [x]Verifier `<html lang="fr">` dans `index.html`
- [x]Test: robots.txt accessible a `/robots.txt`
- [x]Test: sitemap.xml accessible a `/sitemap.xml`

### T4: Analytics
- [x]Ajouter le script Plausible dans `index.html`
- [x]Configurer le domaine dans le script
- [x]Verifier que le tracking fonctionne en SPA (pas de rechargement de page)
- [x]Documenter la config analytics dans le README ou docs

### T5: Page 404
- [x]Creer `src/pages/NotFoundPage.tsx`
- [x]Ajouter la route catch-all `*` dans le Router
- [x]Design : message "Page non trouvee" + bouton retour accueil
- [x]Test: route inconnue affiche la page 404
- [x]Test: lien "retour accueil" fonctionne

### T6: Audit Lighthouse
- [x]Lancer un audit Lighthouse en local (ou sur Vercel preview)
- [x]Corriger les issues Performance si score < 90
- [x]Corriger les issues SEO si score < 90
- [x]Corriger les issues Accessibility si score < 85
- [x]Documenter les scores dans la retro

---

## Design References

- **PRD** : `docs/prd-mvp.md` Section 6 (Criteres de lancement)
- **Plausible** : script CDN cookieless
- **Lighthouse** : audit integre Chrome DevTools

---

## Out of Scope

- Google Analytics (on utilise Plausible pour la simplicite)
- Schema.org structured data (post-MVP)
- Sitemap dynamique genere a chaque build
- A/B testing
- Heatmaps
- i18n (site en francais uniquement)

---

## Definition of Done

- [x]Meta tags sur toutes les pages
- [x]Open Graph configure
- [x]robots.txt et sitemap.xml en place
- [x]Analytics fonctionnel
- [x]Page 404 fonctionnelle
- [x]Lighthouse scores > 90 (Performance, SEO)
- [x]All tests passing (objectif : +8 tests)
- [x]Code reviewed
- [x]Status mis a jour dans ce fichier
- [x]Commit : `feat(STORY-014): add SEO meta tags and analytics`
