# STORY-007: Code Editor + Lesson Page

> **Status** : Ready for Development
> **Sprint** : 2
> **Epic** : 3 - Editeur de code
> **PRD Reference** : US-3.1, US-3.2, US-2.2
> **Points** : 8
> **Assignee** : Amelia
> **Depends on** : STORY-006 (lesson data, course map)

---

## User Story

**En tant que** apprenant,
**Je veux** ecrire du code HTML/CSS dans un editeur integre et voir le resultat en temps reel,
**Afin de** pratiquer sans installer de logiciel.

---

## Acceptance Criteria

### AC-1: Lesson Page Layout (Desktop)
- [ ] Route `/lesson/:id` protege
- [ ] Layout split 3 zones : theorie (gauche) | editeur + preview (droite)
- [ ] Header lecon : bouton retour "[Parcours]", titre lecon, progression X/22
- [ ] Zone theorie : scrollable independamment
- [ ] Zone editeur/preview : split vertical (editeur en haut, preview en bas)

### AC-2: Lesson Page Layout (Mobile)
- [ ] Tabs : "Theorie" | "Code"
- [ ] Tab Theorie : contenu theorie + exercice + message "passe sur Code"
- [ ] Tab Code : editeur + preview empiles
- [ ] Switch entre tabs conserve l'etat du code

### AC-3: Theory Panel
- [ ] Titre de la lecon
- [ ] Contenu theorique formate (paragraphes, listes)
- [ ] Exemples de code dans des blocs `<pre><code>` stylises
- [ ] Section exercice en bas : instructions + checklist des objectifs

### AC-4: Code Editor (Monaco)
- [ ] Monaco Editor integre avec `@monaco-editor/react`
- [ ] Coloration syntaxique HTML et CSS
- [ ] Numerotation des lignes
- [ ] Auto-indentation basique
- [ ] Theme clair
- [ ] Code pre-rempli avec le starterCode de l'exercice
- [ ] Taille de police par defaut 14px

### AC-5: Live Preview
- [ ] iframe avec attribut srcdoc
- [ ] Mise a jour en temps reel (debounce 2000ms via DEBOUNCE_DELAY)
- [ ] Bordure visuelle autour de la preview
- [ ] Message "Ecris du code pour voir le resultat" si code vide

### AC-6: Lesson Navigation
- [ ] Bouton "Parcours" pour retour a /course
- [ ] Chargement de la lecon via l'id dans l'URL
- [ ] 404 si lesson id invalide
- [ ] Titre de la lecon dans le header

### AC-7: Editor State
- [ ] Code persiste en local state pendant la session
- [ ] Bouton "Reinitialiser" pour revenir au starterCode
- [ ] Confirmation avant reset si code modifie

### AC-8: Lazy Loading Monaco
- [ ] Monaco charge en lazy (React.lazy ou dynamic import)
- [ ] Skeleton/spinner pendant le chargement
- [ ] Fallback `<textarea>` si Monaco echoue (error boundary)

---

## Technical Tasks

### T1: Install Monaco Editor
- [ ] `npm install @monaco-editor/react`
- [ ] Verify bundle size impact
- [ ] Configure Vite for Monaco workers if needed

### T2: Create LessonPage
- [ ] Create `src/pages/LessonPage.tsx`
- [ ] Route `/lesson/:id` in App.tsx (protected)
- [ ] Load lesson data by id from static data
- [ ] Split layout with CSS Grid/Flexbox
- [ ] Test: page renders with lesson content
- [ ] Test: 404 for invalid lesson id
- [ ] Test: shows lesson title

### T3: Create TheoryPanel component
- [ ] Create `src/components/lesson/TheoryPanel.tsx`
- [ ] Props: theory (LessonTheory), exercise (LessonExercise)
- [ ] Render formatted theory content
- [ ] Render code examples with syntax highlighting (static)
- [ ] Render exercise instructions + checklist
- [ ] Test: renders theory content
- [ ] Test: renders code examples
- [ ] Test: renders exercise instructions

### T4: Create CodeEditor component
- [ ] Create `src/components/lesson/CodeEditor.tsx`
- [ ] Wrap Monaco Editor with React.lazy
- [ ] Props: initialCode, onChange, language
- [ ] Loading skeleton while Monaco loads
- [ ] Error boundary with textarea fallback
- [ ] Test: renders (with Monaco mocked)
- [ ] Test: calls onChange when code changes
- [ ] Test: shows skeleton during load

### T5: Create PreviewPanel component
- [ ] Create `src/components/lesson/PreviewPanel.tsx`
- [ ] Props: code (string)
- [ ] iframe with srcdoc attribute
- [ ] Debounced update (DEBOUNCE_DELAY)
- [ ] sandbox="allow-same-origin" for security
- [ ] Empty state message
- [ ] Test: renders iframe with code
- [ ] Test: debounces updates
- [ ] Test: shows empty message when no code

### T6: Create LessonLayout component
- [ ] Create `src/components/lesson/LessonLayout.tsx`
- [ ] Desktop: CSS Grid 2 columns (theory | editor+preview)
- [ ] Mobile: tab-based layout
- [ ] Tab state management
- [ ] Test: desktop shows split layout
- [ ] Test: mobile shows tabs

### T7: Create LessonHeader component
- [ ] Create `src/components/lesson/LessonHeader.tsx`
- [ ] Props: lessonTitle, lessonNumber, totalLessons
- [ ] Back link to /course
- [ ] Progress indicator
- [ ] Test: renders lesson title
- [ ] Test: back link navigates to /course

### T8: Integration tests
- [ ] Test: full lesson page renders with all zones
- [ ] Test: code typed in editor appears in preview
- [ ] Test: tab switching on mobile
- [ ] Test: navigation back to course
- [ ] Test: reset code confirmation

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

- [ ] All acceptance criteria met
- [ ] Monaco loads with lazy loading
- [ ] Preview updates in real-time
- [ ] All tests passing (Monaco mocked)
- [ ] Responsive desktop + mobile (tabs)
- [ ] Code reviewed
