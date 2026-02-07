# STORY-007: Code Editor + Lesson Page

> **Status** : Done
> **Sprint** : 2
> **Epic** : 3 - Editeur de code
> **PRD Reference** : US-3.1, US-3.2, US-2.2
> **Points** : 8
> **Assignee** : Amelia
> **Depends on** : STORY-006 (lesson data, course map)
> **Completed** : 7 fevrier 2026
> **Commit** : `a5a0a09`

---

## User Story

**En tant que** apprenant,
**Je veux** ecrire du code HTML/CSS dans un editeur integre et voir le resultat en temps reel,
**Afin de** pratiquer sans installer de logiciel.

---

## Acceptance Criteria

### AC-1: Lesson Page Layout (Desktop)
- [x] Route `/lesson/:id` protege
- [x] Layout split 3 zones : theorie (gauche) | editeur + preview (droite)
- [x] Header lecon : bouton retour "[Parcours]", titre lecon, progression X/22
- [x] Zone theorie : scrollable independamment
- [x] Zone editeur/preview : split vertical (editeur en haut, preview en bas)

### AC-2: Lesson Page Layout (Mobile)
- [x] Tabs : "Theorie" | "Code"
- [x] Tab Theorie : contenu theorie + exercice + message "passe sur Code"
- [x] Tab Code : editeur + preview empiles
- [x] Switch entre tabs conserve l'etat du code

### AC-3: Theory Panel
- [x] Titre de la lecon
- [x] Contenu theorique formate (paragraphes, listes)
- [x] Exemples de code dans des blocs `<pre><code>` stylises
- [x] Section exercice en bas : instructions + checklist des objectifs

### AC-4: Code Editor (Monaco)
- [x] Monaco Editor integre avec `@monaco-editor/react`
- [x] Coloration syntaxique HTML et CSS
- [x] Numerotation des lignes
- [x] Auto-indentation basique
- [x] Theme clair
- [x] Code pre-rempli avec le starterCode de l'exercice
- [x] Taille de police par defaut 14px

### AC-5: Live Preview
- [x] iframe avec attribut srcdoc
- [x] Mise a jour en temps reel (debounce 2000ms via DEBOUNCE_DELAY)
- [x] Bordure visuelle autour de la preview
- [x] Message "Ecris du code pour voir le resultat" si code vide

### AC-6: Lesson Navigation
- [x] Bouton "Parcours" pour retour a /course
- [x] Chargement de la lecon via l'id dans l'URL
- [x] 404 si lesson id invalide
- [x] Titre de la lecon dans le header

### AC-7: Editor State
- [x] Code persiste en local state pendant la session
- [x] Bouton "Reinitialiser" pour revenir au starterCode
- [x] Confirmation avant reset si code modifie

### AC-8: Lazy Loading Monaco
- [x] Monaco charge en lazy (React.lazy ou dynamic import)
- [x] Skeleton/spinner pendant le chargement
- [x] Fallback `<textarea>` si Monaco echoue (error boundary)

---

## Technical Tasks

### T1: Install Monaco Editor
- [x] `npm install @monaco-editor/react`
- [x] Verify bundle size impact
- [x] Configure Vite for Monaco workers if needed

### T2: Create LessonPage
- [x] Create `src/pages/LessonPage.tsx`
- [x] Route `/lesson/:id` in App.tsx (protected)
- [x] Load lesson data by id from static data
- [x] Split layout with CSS Grid/Flexbox
- [x] Test: page renders with lesson content
- [x] Test: 404 for invalid lesson id
- [x] Test: shows lesson title

### T3: Create TheoryPanel component
- [x] Create `src/components/lesson/TheoryPanel.tsx`
- [x] Props: theory (LessonTheory), exercise (LessonExercise)
- [x] Render formatted theory content
- [x] Render code examples with syntax highlighting (static)
- [x] Render exercise instructions + checklist
- [x] Test: renders theory content
- [x] Test: renders code examples
- [x] Test: renders exercise instructions

### T4: Create CodeEditor component
- [x] Create `src/components/lesson/CodeEditor.tsx`
- [x] Wrap Monaco Editor with React.lazy
- [x] Props: initialCode, onChange, language
- [x] Loading skeleton while Monaco loads
- [x] Error boundary with textarea fallback
- [x] Test: renders (with Monaco mocked)
- [x] Test: calls onChange when code changes
- [x] Test: shows skeleton during load

### T5: Create PreviewPanel component
- [x] Create `src/components/lesson/PreviewPanel.tsx`
- [x] Props: code (string)
- [x] iframe with srcdoc attribute
- [x] Debounced update (DEBOUNCE_DELAY)
- [x] sandbox="allow-same-origin" for security
- [x] Empty state message
- [x] Test: renders iframe with code
- [x] Test: debounces updates
- [x] Test: shows empty message when no code

### T6: Create LessonLayout component
- [x] Create `src/components/lesson/LessonLayout.tsx`
- [x] Desktop: CSS Grid 2 columns (theory | editor+preview)
- [x] Mobile: tab-based layout
- [x] Tab state management
- [x] Test: desktop shows split layout
- [x] Test: mobile shows tabs

### T7: Create LessonHeader component
- [x] Create `src/components/lesson/LessonHeader.tsx`
- [x] Props: lessonTitle, lessonNumber, totalLessons
- [x] Back link to /course
- [x] Progress indicator
- [x] Test: renders lesson title
- [x] Test: back link navigates to /course

### T8: Integration tests
- [x] Test: full lesson page renders with all zones
- [x] Test: code typed in editor appears in preview
- [x] Test: tab switching on mobile
- [x] Test: navigation back to course
- [x] Test: reset code confirmation

---

## Design References

- **Wireframe** : `docs/ux-wireframes.md` Section 6 (Interface de lecon)
- **Desktop layout** : Section 6.1
- **Mobile tabs** : Section 6.2, 6.3
- **UI Kit** : `docs/ui-kit.md`

---

## Testing Strategy (Monaco)

Monaco Editor ne fonctionne pas dans jsdom/happy-dom. Strategie :

```
1. Mock Monaco dans les tests unitaires
2. Tester la logique (state, debounce, callbacks) separement
3. Tester le composant CodeEditor avec le mock
4. Integration tests verifient le wiring, pas Monaco lui-meme
```

Mock recommande :
```typescript
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: any) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}))
```

---

## Out of Scope

- Resizable panels (nice to have, pas bloquant)
- Taille de police ajustable (post-MVP)
- Multi-file editor (un seul fichier)
- CSS separate file (tout dans un seul fichier HTML)
- Responsive preview toggle (mobile/desktop)
- Save draft to Supabase

---

## Definition of Done

- [x] All acceptance criteria met
- [x] Monaco loads with lazy loading
- [x] Preview updates in real-time
- [x] All tests passing (Monaco mocked)
- [x] Responsive desktop + mobile (tabs)
- [x] Code reviewed
