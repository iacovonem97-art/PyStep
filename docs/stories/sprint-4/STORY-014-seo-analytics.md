# STORY-014: SEO, Meta tags et Analytics

> **Status** : Pending
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
- [ ] `<title>` unique et descriptif sur chaque page
- [ ] `<meta name="description">` sur chaque page
- [ ] `<meta name="viewport">` present (deja le cas via Vite)
- [ ] Langue declaree : `<html lang="fr">`

### AC-2: Open Graph (partage reseaux sociaux)
- [ ] `og:title`, `og:description`, `og:type`, `og:url` sur la page d'accueil
- [ ] `og:image` avec une image de preview (a creer ou placeholder)
- [ ] `twitter:card`, `twitter:title`, `twitter:description`

### AC-3: SEO technique
- [ ] `robots.txt` a la racine (autoriser tous les crawlers)
- [ ] `sitemap.xml` genere avec les pages principales
- [ ] URLs propres et semantiques (deja le cas avec React Router)
- [ ] Pas de contenu duplique

### AC-4: Analytics
- [ ] Script Plausible Analytics integre (CDN, gratuit self-host ou cloud)
- [ ] Tracking des page views automatique (SPA-friendly)
- [ ] Pas de cookies (Plausible est cookieless = pas de banniere RGPD)
- [ ] Script charge en `async defer` pour ne pas impacter la performance

### AC-5: Performance
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse SEO score > 90
- [ ] Lighthouse Accessibility score > 85
- [ ] Temps de chargement < 3s sur 3G simule

### AC-6: Page 404
- [ ] Route catch-all pour les URLs invalides
- [ ] Page 404 avec message amical et lien vers l'accueil
- [ ] Design coherent avec le reste du site

---

## Technical Tasks

### T1: Meta tags dynamiques
- [ ] Installer `react-helmet-async` (ou utiliser le document head directement)
- [ ] Creer un composant `SEOHead` reutilisable
- [ ] Configurer les meta tags par defaut dans `index.html`
- [ ] Ajouter les meta tags dynamiques sur les pages principales (Home, Dashboard, Course, Lesson)
- [ ] Test: chaque page a un title unique

### T2: Open Graph
- [ ] Ajouter les tags OG dans `index.html` (valeurs par defaut)
- [ ] Creer ou trouver une image OG (1200x630px) pour le partage
- [ ] Placer l'image dans `public/og-image.png`
- [ ] Ajouter les tags Twitter Card

### T3: SEO technique
- [ ] Creer `public/robots.txt`
- [ ] Creer `public/sitemap.xml` (statique, avec les pages principales)
- [ ] Verifier `<html lang="fr">` dans `index.html`
- [ ] Test: robots.txt accessible a `/robots.txt`
- [ ] Test: sitemap.xml accessible a `/sitemap.xml`

### T4: Analytics
- [ ] Ajouter le script Plausible dans `index.html`
- [ ] Configurer le domaine dans le script
- [ ] Verifier que le tracking fonctionne en SPA (pas de rechargement de page)
- [ ] Documenter la config analytics dans le README ou docs

### T5: Page 404
- [ ] Creer `src/pages/NotFoundPage.tsx`
- [ ] Ajouter la route catch-all `*` dans le Router
- [ ] Design : message "Page non trouvee" + bouton retour accueil
- [ ] Test: route inconnue affiche la page 404
- [ ] Test: lien "retour accueil" fonctionne

### T6: Audit Lighthouse
- [ ] Lancer un audit Lighthouse en local (ou sur Vercel preview)
- [ ] Corriger les issues Performance si score < 90
- [ ] Corriger les issues SEO si score < 90
- [ ] Corriger les issues Accessibility si score < 85
- [ ] Documenter les scores dans la retro

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

- [ ] Meta tags sur toutes les pages
- [ ] Open Graph configure
- [ ] robots.txt et sitemap.xml en place
- [ ] Analytics fonctionnel
- [ ] Page 404 fonctionnelle
- [ ] Lighthouse scores > 90 (Performance, SEO)
- [ ] All tests passing (objectif : +8 tests)
- [ ] Code reviewed
- [ ] Status mis a jour dans ce fichier
- [ ] Commit : `feat(STORY-014): add SEO meta tags and analytics`
