# STORY-008: Exercise Validation + Feedback

> **Status** : Ready for Development
> **Sprint** : 2
> **Epic** : 3 - Editeur de code / Epic 2 - Parcours
> **PRD Reference** : US-3.3, US-2.2 (partial)
> **Points** : 4
> **Assignee** : Amelia
> **Depends on** : STORY-007 (CodeEditor, LessonPage)

---

## User Story

**En tant que** apprenant,
**Je veux** valider mon code et recevoir un feedback clair,
**Afin de** savoir si j'ai reussi l'exercice et progresser.

---

## Acceptance Criteria

### AC-1: Validate Button
- [ ] Bouton "Verifier mon code" visible en bas de la page lecon
- [ ] Bouton "Indice" a cote du bouton verifier
- [ ] Bouton desactive si code vide ou identique au starterCode
- [ ] Loading state pendant la validation

### AC-2: Success Feedback
- [ ] Modal/panel de succes avec message encourageant ("Bravo !")
- [ ] Checklist des tests passes (icone vert + nom du test)
- [ ] Barre de progression mise a jour ("+X%")
- [ ] Bouton "Lecon suivante" prominent
- [ ] Lien "Revoir cette lecon"
- [ ] Conforme au wireframe Section 7.1

### AC-3: Error Feedback
- [ ] Panel d'erreur avec message bienveillant ("Presque !")
- [ ] Checklist mixte : tests passes (vert) + tests echoues (orange)
- [ ] Message d'erreur specifique par test echoue
- [ ] Bouton "Reessayer"
- [ ] Lien "Voir un indice"
- [ ] Conforme au wireframe Section 7.2

### AC-4: Progressive Hints
- [ ] 3 niveaux d'indices progressifs
- [ ] Niveau 1 : indice generique (direction)
- [ ] Niveau 2 : indice precis (structure attendue)
- [ ] Niveau 3 : solution complete
- [ ] Popover/modal pour chaque indice
- [ ] Boutons : "Compris !" / "Encore un indice" / "Voir la solution"
- [ ] Compteur d'indices utilises visible
- [ ] Conforme au wireframe Section 7.3

### AC-5: Lesson Navigation
- [ ] "Lecon suivante" apres validation reussie → navigate vers `/lesson/:nextId`
- [ ] Derniere lecon du module → message "Module termine !" + retour /course
- [ ] Progression locale mise a jour (marquer lecon complete)

### AC-6: Validation Engine Integration
- [ ] Utiliser `validateExercise()` de `src/features/lessons/validator.ts`
- [ ] Passer le code de l'editeur + les tests de l'exercice
- [ ] Mapper ValidationResult vers l'UI de feedback

---

## Technical Tasks

### T1: Create ValidationBar component
- [ ] Create `src/components/lesson/ValidationBar.tsx`
- [ ] Props: onValidate, onHint, isValidating, codeChanged
- [ ] Bouton "Indice" + bouton "Verifier mon code"
- [ ] Disabled state si code non modifie
- [ ] Test: renders both buttons
- [ ] Test: disabled when code unchanged
- [ ] Test: calls onValidate on click

### T2: Create FeedbackPanel component
- [ ] Create `src/components/lesson/FeedbackPanel.tsx`
- [ ] Props: result (ValidationResult), onNext, onRetry, onReview
- [ ] Success view: bravo + checklist + progress + next
- [ ] Error view: presque + checklist + retry + hint link
- [ ] Test: renders success state
- [ ] Test: renders error state with failed tests
- [ ] Test: next button calls onNext

### T3: Create HintModal component
- [ ] Create `src/components/lesson/HintModal.tsx`
- [ ] Props: hints (string[]), currentLevel, onClose, onNext
- [ ] 3 levels: generic → precise → solution
- [ ] Navigation between levels
- [ ] Test: shows correct hint level
- [ ] Test: shows "Voir la solution" on level 2
- [ ] Test: close button works

### T4: Wire validation in LessonPage
- [ ] Import validateExercise from features/lessons
- [ ] Connect editor code → validation → feedback
- [ ] State management: validationResult, hintLevel, showFeedback
- [ ] Update local progress on success
- [ ] Test: validation flow end to end (mocked)
- [ ] Test: hint progression 1→2→3

### T5: Create useExercise hook
- [ ] Create `src/features/lessons/useExercise.ts`
- [ ] Manages: code state, validation result, hint level, attempts count
- [ ] Methods: validate(), nextHint(), resetCode(), markComplete()
- [ ] Test: validate updates result
- [ ] Test: nextHint increments level
- [ ] Test: markComplete updates progress

### T6: Lesson navigation logic
- [ ] Determine next lesson id from current lesson
- [ ] Handle end-of-module case
- [ ] Navigate to next lesson on click
- [ ] Test: next lesson navigation
- [ ] Test: last lesson of module shows completion

### T7: Integration tests
- [ ] Test: write code → validate → success → next lesson
- [ ] Test: write bad code → validate → error → hint → retry → success
- [ ] Test: hint progression through 3 levels
- [ ] Test: progress updates after completion

---

## Design References

- **Wireframe** : `docs/ux-wireframes.md` Section 7 (Etats de feedback)
- **Success** : Section 7.1
- **Error** : Section 7.2
- **Hints** : Section 7.3
- **Notes UX** : Section 7.4

---

## Out of Scope

- Sauvegarde progression Supabase (local state only)
- Confettis/animations elaborate (simple transition OK)
- Score/classement
- Nombre d'essais limite (illimite)
- Timer

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Validation engine properly wired
- [ ] Success + Error feedback conformes aux wireframes
- [ ] Hints work through 3 levels
- [ ] Lesson navigation works
- [ ] All tests passing
- [ ] Code reviewed
