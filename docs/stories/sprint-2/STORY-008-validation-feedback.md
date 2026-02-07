# STORY-008: Exercise Validation + Feedback

> **Status** : Done
> **Sprint** : 2
> **Epic** : 3 - Editeur de code / Epic 2 - Parcours
> **PRD Reference** : US-3.3, US-2.2 (partial)
> **Points** : 4
> **Assignee** : Amelia
> **Depends on** : STORY-007 (CodeEditor, LessonPage)
> **Completed** : 7 fevrier 2026
> **Commit** : `97cdbc4`

---

## User Story

**En tant que** apprenant,
**Je veux** valider mon code et recevoir un feedback clair,
**Afin de** savoir si j'ai reussi l'exercice et progresser.

---

## Acceptance Criteria

### AC-1: Validate Button
- [x] Bouton "Verifier mon code" visible en bas de la page lecon
- [x] Bouton "Indice" a cote du bouton verifier
- [x] Bouton desactive si code vide ou identique au starterCode
- [x] Loading state pendant la validation

### AC-2: Success Feedback
- [x] Modal/panel de succes avec message encourageant ("Bravo !")
- [x] Checklist des tests passes (icone vert + nom du test)
- [x] Barre de progression mise a jour ("+X%")
- [x] Bouton "Lecon suivante" prominent
- [x] Lien "Revoir cette lecon"
- [x] Conforme au wireframe Section 7.1

### AC-3: Error Feedback
- [x] Panel d'erreur avec message bienveillant ("Presque !")
- [x] Checklist mixte : tests passes (vert) + tests echoues (orange)
- [x] Message d'erreur specifique par test echoue
- [x] Bouton "Reessayer"
- [x] Lien "Voir un indice"
- [x] Conforme au wireframe Section 7.2

### AC-4: Progressive Hints
- [x] 3 niveaux d'indices progressifs
- [x] Niveau 1 : indice generique (direction)
- [x] Niveau 2 : indice precis (structure attendue)
- [x] Niveau 3 : solution complete
- [x] Popover/modal pour chaque indice
- [x] Boutons : "Compris !" / "Encore un indice" / "Voir la solution"
- [x] Compteur d'indices utilises visible
- [x] Conforme au wireframe Section 7.3

### AC-5: Lesson Navigation
- [x] "Lecon suivante" apres validation reussie → navigate vers `/lesson/:nextId`
- [x] Derniere lecon du module → message "Module termine !" + retour /course
- [x] Progression locale mise a jour (marquer lecon complete)

### AC-6: Validation Engine Integration
- [x] Utiliser `validateExercise()` de `src/features/lessons/validator.ts`
- [x] Passer le code de l'editeur + les tests de l'exercice
- [x] Mapper ValidationResult vers l'UI de feedback

---

## Technical Tasks

### T1: Create ValidationBar component
- [x] Create `src/components/lesson/ValidationBar.tsx`
- [x] Props: onValidate, onHint, isValidating, codeChanged
- [x] Bouton "Indice" + bouton "Verifier mon code"
- [x] Disabled state si code non modifie
- [x] Test: renders both buttons
- [x] Test: disabled when code unchanged
- [x] Test: calls onValidate on click

### T2: Create FeedbackPanel component
- [x] Create `src/components/lesson/FeedbackPanel.tsx`
- [x] Props: result (ValidationResult), onNext, onRetry, onReview
- [x] Success view: bravo + checklist + progress + next
- [x] Error view: presque + checklist + retry + hint link
- [x] Test: renders success state
- [x] Test: renders error state with failed tests
- [x] Test: next button calls onNext

### T3: Create HintModal component
- [x] Create `src/components/lesson/HintModal.tsx`
- [x] Props: hints (string[]), currentLevel, onClose, onNext
- [x] 3 levels: generic → precise → solution
- [x] Navigation between levels
- [x] Test: shows correct hint level
- [x] Test: shows "Voir la solution" on level 2
- [x] Test: close button works

### T4: Wire validation in LessonPage
- [x] Import validateExercise from features/lessons
- [x] Connect editor code → validation → feedback
- [x] State management: validationResult, hintLevel, showFeedback
- [x] Update local progress on success
- [x] Test: validation flow end to end (mocked)
- [x] Test: hint progression 1→2→3

### T5: Create useExercise hook
- [x] Create `src/features/lessons/useExercise.ts`
- [x] Manages: code state, validation result, hint level, attempts count
- [x] Methods: validate(), nextHint(), resetCode(), markComplete()
- [x] Test: validate updates result
- [x] Test: nextHint increments level
- [x] Test: markComplete updates progress

### T6: Lesson navigation logic
- [x] Determine next lesson id from current lesson
- [x] Handle end-of-module case
- [x] Navigate to next lesson on click
- [x] Test: next lesson navigation
- [x] Test: last lesson of module shows completion

### T7: Integration tests
- [x] Test: write code → validate → success → next lesson
- [x] Test: write bad code → validate → error → hint → retry → success
- [x] Test: hint progression through 3 levels
- [x] Test: progress updates after completion

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

- [x] All acceptance criteria met
- [x] Validation engine properly wired
- [x] Success + Error feedback conformes aux wireframes
- [x] Hints work through 3 levels
- [x] Lesson navigation works
- [x] All tests passing
- [x] Code reviewed
