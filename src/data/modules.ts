import type { Module, ModuleMeta } from '@/types/module'
import { module1Lessons } from './lessons/module-1'
import { module2Lessons } from './lessons/module-2'
import { module3Lessons } from './lessons/module-3'
import { module4Lessons } from './lessons/module-4'
import { module5Lessons } from './lessons/module-5'

export const MODULES_META: ModuleMeta[] = [
  { id: 1, title: 'Les fondations HTML', description: 'Découvre les bases du HTML et crée ta première page web', lessonCount: 6 },
  { id: 2, title: 'HTML sémantique', description: 'Structure tes pages avec les balises sémantiques', lessonCount: 4 },
  { id: 3, title: 'Introduction au CSS', description: 'Ajoute du style à tes pages avec les bases du CSS', lessonCount: 5 },
  { id: 4, title: 'Mise en page CSS', description: 'Maîtrise Flexbox, Grid et le responsive design', lessonCount: 5 },
  { id: 5, title: 'Projet Final', description: 'Crée un portfolio complet en HTML et CSS', lessonCount: 2 },
]

export const MODULES: Module[] = [
  { ...MODULES_META[0], lessons: module1Lessons },
  { ...MODULES_META[1], lessons: module2Lessons },
  { ...MODULES_META[2], lessons: module3Lessons },
  { ...MODULES_META[3], lessons: module4Lessons },
  { ...MODULES_META[4], lessons: module5Lessons },
]

export function getLessonById(id: string) {
  for (const mod of MODULES) {
    const lesson = mod.lessons.find((l) => l.id === id)
    if (lesson) return lesson
  }
  return null
}

export function getNextLessonId(currentId: string): string | null {
  const allLessons = MODULES.flatMap((m) => m.lessons)
  const idx = allLessons.findIndex((l) => l.id === currentId)
  if (idx === -1 || idx === allLessons.length - 1) return null
  return allLessons[idx + 1].id
}

export function getFirstLessonId(moduleId: number): string | null {
  const mod = MODULES.find((m) => m.id === moduleId)
  if (!mod || mod.lessons.length === 0) return null
  return mod.lessons[0].id
}
