# STORY-001: Landing Page

> **Status**: Done
> **Sprint**: 1
> **Epic**: 4 - Pages statiques
> **PRD Reference**: US-4.1
> **Points**: 5
> **Assignee**: Amelia
> **Completed**: 6 fevrier 2026
> **Commit**: `df76e38`

---

## User Story

**En tant que** visiteur,
**Je veux** comprendre ce qu'est Pystep en arrivant sur le site,
**Afin de** décider si je veux m'inscrire.

---

## Acceptance Criteria

### AC-1: Header Navigation
- [x] Logo Pystep cliquable (retour accueil)
- [x] Bouton "Se connecter" (lien vers /login)
- [x] Bouton "S'inscrire" (lien vers /register)
- [x] Header sticky avec shadow au scroll
- [x] Mobile: menu hamburger avec navigation

### AC-2: Hero Section
- [x] Headline: "Apprends le code web, step by step."
- [x] Sous-titre: "Du premier <h1> à ton premier site web. Gratuit. Sans installation. À ton rythme."
- [x] CTA primaire: "Commencer gratuitement" (lien vers /register)
- [x] Social proof: compteur apprenants (statique "127 apprenants inscrits")
- [x] Aperçu éditeur (image/illustration statique)

### AC-3: How It Works Section
- [x] Titre: "Comment ça marche ?"
- [x] 3 étapes avec icônes:
  1. "Inscris-toi gratuitement" - "Juste un email et c'est parti"
  2. "Suis le parcours" - "22 leçons interactives"
  3. "Crée ton premier site" - "Un portfolio complet"

### AC-4: Curriculum Section
- [x] Titre: "Le parcours complet"
- [x] 5 modules affichés avec:
  - Nom du module
  - Nombre de leçons
  - Icône ou badge visuel
- [x] Visualisation horizontale (desktop) / verticale (mobile)

### AC-5: CTA Final
- [x] Bouton "Commencer maintenant" avant le footer
- [x] Centré, style primaire large

### AC-6: Footer
- [x] Logo Pystep
- [x] Tagline: "Apprends le code step by step."
- [x] Liens: Parcours, FAQ, Mentions légales
- [x] Contact: hello@pystep.fr
- [x] Copyright: "© 2026 Pystep"

### AC-7: Responsive Design
- [x] Mobile (< 768px): layout vertical, menu hamburger
- [x] Tablet (768-1024px): layout adapté
- [x] Desktop (> 1024px): layout horizontal complet
- [x] Tous les textes lisibles sans zoom

### AC-8: Accessibility
- [x] Contraste WCAG AA (4.5:1 minimum)
- [x] Navigation clavier complète
- [x] Focus visible sur éléments interactifs
- [x] Headings hiérarchiques (h1 > h2 > h3)
- [x] Alt text sur images

---

## Technical Tasks

### T1: Create page structure
- [x] Create `src/pages/HomePage.tsx`
- [x] Create route `/` in router
- [x] Test: page renders without error

### T2: Create Header component
- [x] Create `src/components/layout/Header.tsx`
- [x] Implement logo, nav links, CTA buttons
- [x] Implement sticky behavior
- [x] Implement mobile hamburger menu
- [x] Test: header sticky on scroll
- [x] Test: mobile menu opens/closes
- [x] Test: all links navigate correctly

### T3: Create HeroSection component
- [x] Create `src/components/home/HeroSection.tsx`
- [x] Implement headline, subtitle, CTA
- [x] Add social proof counter
- [x] Add editor preview illustration
- [x] Test: CTA links to /register
- [x] Test: responsive layout

### T4: Create HowItWorks component
- [x] Create `src/components/home/HowItWorks.tsx`
- [x] Implement 3-step cards
- [x] Add icons (Lucide)
- [x] Test: renders 3 steps
- [x] Test: responsive grid

### T5: Create CurriculumPreview component
- [x] Create `src/components/home/CurriculumPreview.tsx`
- [x] Display 5 modules with info
- [x] Implement horizontal/vertical layout
- [x] Test: renders all 5 modules
- [x] Test: responsive layout

### T6: Create Footer component
- [x] Create `src/components/layout/Footer.tsx`
- [x] Implement links and copyright
- [x] Test: all links work
- [x] Test: responsive layout

### T7: Integration tests
- [x] Test: full page renders
- [x] Test: navigation flow
- [x] Test: accessibility (basic checks via tests)
- [x] Test: responsive breakpoints (via CSS classes)

---

## Design References

- **Wireframe**: `docs/ux-wireframes.md` Section 2
- **UI Kit**: `docs/ui-kit.md`
- **Colors**: Primary Indigo (#6366F1), Gray scale
- **Typography**: Inter for UI
- **Icons**: Lucide Icons

---

## Out of Scope

- Dynamic learner count (hardcoded for MVP)
- Animations/micro-interactions (can be added later)
- Dark mode
- i18n

---

## Definition of Done

- [x] All acceptance criteria met
- [x] All tests passing (unit + integration) - **93 tests passing**
- [x] Responsive on mobile/tablet/desktop
- [x] Accessibility audit passed (basic checks)
- [x] Code reviewed
- [x] Deployed to preview -- https://pystep.vercel.app

---

## Notes

Cette page est la première impression des visiteurs. Priorité absolue sur la clarté et la conversion vers l'inscription.
